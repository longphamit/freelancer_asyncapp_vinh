import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '../../hooks';
import { Text, ImageView } from '../../components';
import style from './style';
import Colors from '../../theme/colors';
import { CLIPBOARD_TYPES } from '../../commons/constants';
import Services from '../../services';
import Utils from '../../commons/utils';
import Images from '../../assets/images';
import Storage from '../../storage';
import Screens from '../screens';
import PhotoEditor from 'react-native-photo-editor'
import RNFS from 'react-native-fs';
import Clipboard from '@react-native-clipboard/clipboard';
import ImgToBase64 from 'react-native-image-base64';
const Home = ({ componentId }) => {
  const navigation = useNavigation(componentId);
  const { t } = useTranslation();
  const [filePath, setFilePath] = useState({});
  const [clipboards, setClipboards] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState(CLIPBOARD_TYPES.ALL);
  const [page, setPage] = useState(1)
  const searchTimer = useRef(0);
  const user = Storage.user.get();

  const copyToClipboard = (param) => {
    Clipboard.setString(param);
    ToastAndroid.show("Saved", ToastAndroid.LONG)
  };

  // fix onChangeKeyword function not provide new keyword value
  const getClipboards = (searchKeyword = null) => {
    setRefreshing(true);

    const params = { keyword };

    if (searchKeyword !== null) {
      params.keyword = searchKeyword;
    }

    if (selectedType !== CLIPBOARD_TYPES.ALL) {
      params.type = selectedType;
    }

    Services.api
      .getClipboards(params)
      .then(response => {
        if (Utils.isResponseSuccess(response)) {
          const clipboardsData = Array.from(response.data);
          clipboardsData.sort((a, b) => (a._id < b._id ? 1 : -1));

          setClipboards(clipboardsData);
        } else {
          console.log('Get clipboards failed. Response: ', response);
        }
      })
      .catch(error => {
        console.log('Get clipboards error: ', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };
  //
  useEffect(() => {
    getClipboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getClipboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const ClipboardType = useCallback(
    ({ type, iconName, iconColor }) => {
      return (
        <TouchableOpacity
          style={[
            style.clipboardType,
            type === selectedType && style.clipboardTypeSelected,
          ]}
          onPress={() => setSelectedType(type)}>
          <Feather name={iconName} size={14} color={iconColor} />
          <Text category="c3"> {t(type)}</Text>
        </TouchableOpacity>
      );
    },
    [selectedType, t],
  );

  const getDotStyle = (type, color) => {
    return [
      style.dot,
      selectedType === type && { backgroundColor: color, borderColor: color },
    ];
  };

  const keyExtractor = useCallback(item => item._id, []);

  const renderClipboard = useCallback(
    ({ item }) => {
      let content = null;

      if (item.type === CLIPBOARD_TYPES.IMAGE) {
        content = (
          <ImageView
            source={{
              uri: item.content,
              headers: { Authorization: `Bearer ${user.token}` },
            }}
            style={style.image}
            resizeMode={ImageView.resizeMode.contain}
          />
        );
      } else {
        content = (
          <Text
            numberOfLines={4}
            style={item.type === CLIPBOARD_TYPES.LINK && style.link}>
            {item.content}
          </Text>
        );
      }

      return (
        <View style={style.clipboard}>
          <View style={style.clipboardContent}>{content}</View>
          <TouchableOpacity style={style.copyIcon}>
            <Ionicons  onPress={()=>{copyToClipboard(item.content)}} name="copy-outline" size={20} color={Colors.grey} />
          </TouchableOpacity>
        </View>
      );
    },
    [user.token],
  );

  const renderListEmpty = useCallback(() => {
    return (
      <View style={style.emptyContainer}>
        <ImageView source={Images.warning} style={style.emptyIcon} />
        <Text category="s3">{t('clipboard_empty')}</Text>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeKeyword = text => {
    setKeyword(text);
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
      getClipboards(text);
    }, 500);
  };

  const navigateSettingLayout = useCallback(() => {
    navigation.push(Screens.Setting);
  }, [navigation]);
  const callBackEditImage = (response) => {
    {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        const pathImage = source.uri.replace('file://', '')
        PhotoEditor.Edit({
          path: pathImage,
          hiddenControls: ["save"],
          onDone() {
            ImgToBase64.getBase64String(source.uri)
              .then(base64String => {
                Services.api.addClipboard({"content":`data:${source.type};base64,`+base64String})
                  .then(response => {
                    console.log("response data"+JSON.stringify(response)),
                    ToastAndroid.show("Saved", ToastAndroid.LONG)
                    getClipboards()
                  })
              })
              .catch(err => console.log(err));
          },
        });
        setFilePath(source);
      }
    }
  }
  // const navigateClipboardDetailLayout = useCallback(() => {
  //   navigation.push(Screens);
  // }, [navigation]);

  return (
    <View style={style.container}>
      <View style={style.searchWrapper}>
        <View style={style.searchContainer}>
          <Ionicons name="search-outline" size={20} />
          <TextInput
            placeholder={t('search_placeholder')}
            style={style.searchInput}
            value={keyword}
            onChangeText={onChangeKeyword}
          />
        </View>

        <TouchableOpacity
          style={style.settingIcon}
          onPress={navigateSettingLayout}>
          <Ionicons name="settings-outline" size={20} color={Colors.pink} />
        </TouchableOpacity>
      </View>

      <View style={style.clipboardTypeWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ClipboardType
            type={CLIPBOARD_TYPES.ALL}
            iconName="clipboard"
            iconColor={Colors.pinkTitle}
          />
          <ClipboardType
            type={CLIPBOARD_TYPES.IMAGE}
            iconName="image"
            iconColor={Colors.info}
          />
          <ClipboardType
            type={CLIPBOARD_TYPES.LINK}
            iconName="link"
            iconColor={Colors.pink}
          />
          <ClipboardType
            type={CLIPBOARD_TYPES.FILE}
            iconName="file"
            iconColor={Colors.success}
          />
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getClipboards} />
        }>
        <View style={style.dots}>
          <View style={getDotStyle(CLIPBOARD_TYPES.ALL, Colors.pinkTitle)} />
          <View style={getDotStyle(CLIPBOARD_TYPES.IMAGE, Colors.info)} />
          <View style={getDotStyle(CLIPBOARD_TYPES.LINK, Colors.pink)} />
          <View style={getDotStyle(CLIPBOARD_TYPES.FILE, Colors.success)} />
        </View>

        <Text category="h6">{t('add_clipboard')}</Text>
        <View style={style.actionWrapper}>
          <TouchableOpacity style={style.camera} onPress={() => { launchCamera({ cameraType: "back" }, (response) => callBackEditImage(response)) }}>
            <Ionicons name="camera-outline" size={20} color={Colors.grey} />
            <Text> {t('take_capture')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.camera} onPress={() => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => callBackEditImage(response))
          }}>
            <Ionicons name="albums-outline" size={20} color={Colors.grey} />
            <Text> {t('choose_image_from_device')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.camera}>
            <Ionicons name="text-outline" size={20} color={Colors.grey} />
            <Text> {t('text')}</Text>
          </TouchableOpacity>
        </View>

        <Text category="h6">{t('clipboards')}</Text>
        <FlatList
          data={clipboards}
          extraData={clipboards}
          keyExtractor={keyExtractor}
          renderItem={renderClipboard}
          ListEmptyComponent={renderListEmpty}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

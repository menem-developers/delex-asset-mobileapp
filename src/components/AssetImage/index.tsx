import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {
  logo,
  paper_pad,
  upload_asset_image,
  login_bg,
  home_bg,
  audit_asset_icon,
  register_asset_icon,
  add,
  back,
  bell,
  branchSvg,
  complete_flag,
  edit,
  eye,
  re_register,
  search,
  scanner,
  major,
  menu,
  chev_right,
  success_checked,
  rfidScan,
} from 'assets/img';

export type IAssets =
  | 'logo'
  | 'paper_pad'
  | 'upload_asset_image'
  | 'login_bg'
  | 'audit_asset_icon'
  | 'register_asset_icon'
  | 'home_bg'
  | 'branchSvg'
  | 'add'
  | 'back'
  | 'bell'
  | 'complete_flag'
  | 'edit'
  | 'eye'
  | 're_register'
  | 'search'
  | 'scanner'
  | 'major'
  | 'menu'
  | 'chev_right'
  | 'success_checked'
  | 'rfid_scanning';

const assets: Record<IAssets, {height: number; width: number; image: any}> = {
  logo: {
    height: 160,
    width: 732,
    image: logo,
  },
  paper_pad: {
    height: 128,
    width: 129,
    image: paper_pad,
  },
  upload_asset_image: {
    height: 240,
    width: 240,
    image: upload_asset_image,
  },
  login_bg: {
    height: 1572,
    width: 1440,
    image: login_bg,
  },
  home_bg: {
    height: 1108,
    width: 1440,
    image: home_bg,
  },
  audit_asset_icon: {
    height: 321,
    width: 352,
    image: audit_asset_icon,
  },
  register_asset_icon: {
    height: 321,
    width: 352,
    image: register_asset_icon,
  },
  branchSvg: {
    height: 321,
    width: 352,
    image: branchSvg,
  },
  add: {
    height: 321,
    width: 352,
    image: add,
  },
  back: {
    height: 321,
    width: 352,
    image: back,
  },
  bell: {
    height: 321,
    width: 352,
    image: bell,
  },
  complete_flag: {
    height: 321,
    width: 352,
    image: complete_flag,
  },
  edit: {
    height: 321,
    width: 352,
    image: edit,
  },
  eye: {
    height: 321,
    width: 352,
    image: eye,
  },
  re_register: {
    height: 321,
    width: 352,
    image: re_register,
  },
  search: {
    height: 321,
    width: 352,
    image: search,
  },
  scanner: {
    height: 321,
    width: 352,
    image: scanner,
  },
  major: {
    height: 321,
    width: 352,
    image: major,
  },
  menu: {
    height: 321,
    width: 352,
    image: menu,
  },
  chev_right: {
    height: 321,
    width: 352,
    image: chev_right,
  },
  success_checked: {
    height: 10,
    width: 10,
    image: success_checked,
  },
  rfid_scanning: {
    height: 10,
    width: 10,
    image: rfidScan,
  },
};

interface IAssetImageProps {
  image: IAssets;
  size?: number;
  style?: StyleProp<ImageStyle>;
  fitWidth?: boolean;
}

export const AssetImage: React.FC<IAssetImageProps> = props => {
  const {image, size = 1, style, fitWidth} = props;
  let height,
    width = 0;
  if (fitWidth) {
    height = (assets[image].height / assets[image].width) * size;
    width = size;
  } else {
    height = size;
    width = (assets[image].width / assets[image].height) * size;
  }

  return (
    <Image
      source={assets[image].image}
      style={StyleSheet.compose(style, {height, width})}
    />
  );
};

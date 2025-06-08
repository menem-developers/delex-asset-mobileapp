import {DeviceEventEmitter, ToastAndroid} from 'react-native';
import {
  deInitializeReader,
  initializeReader,
  powerListener,
  readSingleTag,
  startReadingTags,
  stopReadingTags,
  tagListener,
} from 'react-native-rfid-chainway-c72';

let isMultiple = false;

export const initializeRead = async () => {
  try {
    await initializeReader();
    powerListener(eventListenerPower);
    // @ts-ignore
    tagListener(eventListenerTag);
  } catch (error: any) {
    ToastAndroid.show(error?.message ?? '', ToastAndroid.SHORT);
  }
};

const eventListenerPower = async (data: any) => {
  try {
    console.log(data?.toLocaleUpperCase()?.replace('SUCCESS:', 'RFID Power: '));
    // await handlerReadPower();
  } catch (error: any) {
    console.log('Event Listener Power', error?.message);
  }
};

const eventListenerTag = async (data: any[]) => {
  try {
    console.log('Event Listener Tag:- ' + JSON.stringify(data));
    if (isMultiple) {
      DeviceEventEmitter.emit('multiscantag', {tag: data[0]});
    }
    // await handlerReadPower();
  } catch (error: any) {
    console.log('Event Listener Tag', error?.message);
  }
};

export const handlerScanSingleTag = async () => {
  try {
    isMultiple = false;
    await initializeRead();
    const result = await readSingleTag();
    await deInitializeReader();
    return result;
  } catch (error: any) {
    console.log('RFID Reading Power', error?.message);
  }
};

export const handlerStartReading = async () => {
  try {
    isMultiple = true;
    await initializeRead();
    await startReadingTags((message: any) => {
      console.log('Start Reading:- ' + JSON.stringify(message));
    });
  } catch (error: any) {
    console.log('RFID Reading Power', error?.message);
  }
};

export const handlerStopReading = async () => {
  try {
    isMultiple = false;
    await stopReadingTags(async (message: any) => {
      console.log('Stop Reading:', JSON.stringify(message));
      await deInitializeReader();
    });
  } catch (error: any) {
    console.log('Stop Reading Error:', error?.message);
  }
};

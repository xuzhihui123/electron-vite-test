export interface IElectronAPI {
  platform: string;
  setTitle:(name:string|number)=>Promise<void>,
  openFile:()=>Promise<void>,
  handleCounter:(callback:(...args:any[])=>any)=>Promise<void>
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electronAPI: IElectronAPI;
  }
}

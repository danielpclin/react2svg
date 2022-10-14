import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import * as joint from "jointjs";

// Create your SyncedStore store
export const store = syncedStore({ cells: [] as joint.dia.Cell.JSON[], version: {} });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("1337", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
export const serialize = <T>(data: T): Buffer => {
  return Buffer.from(JSON.stringify(data));
};

export const deserialize = <T>(buffer: Buffer): T => {
  return JSON.parse(buffer.toString());
};

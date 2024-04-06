export const connection: Connection = {
  CONNECTION_STRING: 'MYSQL://12345/asd',
  DB: 'MYSQL',
  DBNAME: 'learn_nest',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};

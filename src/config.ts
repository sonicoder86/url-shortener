export const config = {
  port: parseInt(process.env.PORT as string, 10),
  baseUrl: process.env.BASE_URL as string,
  mongodb: {
    url: process.env.MONGODB_URL as string,
  }
};

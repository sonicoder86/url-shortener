import { nanoid } from 'nanoid';
import { config } from '../config';
import { UrlModel } from '../models/url.model';
import { UrlStatModel } from '../models/url-stat.model';

export class UrlService {
  public static async create(
    url: string,
  ): Promise<{ originalUrl: string; shortUrl: string; shortId: string }> {
    const shortId = nanoid(13);
    const shortUrl = `${config.baseUrl}/redirect/${shortId}`;
    const originalUrl = url;

    await UrlModel.create({ originalUrl, shortId });
    await UrlStatModel.create({ visits: 0, shortId });

    return { originalUrl, shortUrl, shortId };
  }

  public static async redirect(shortId: string): Promise<string> {
    const url = await UrlModel.findOne({ shortId });

    if (!url) {
      throw new Error('Url not found');
    }

    await UrlStatModel.findOneAndUpdate({ shortId }, { $inc: { visits: 1 } });
    return url.originalUrl;
  }

  public static async cleanup(): Promise<void> {
    await UrlModel.deleteMany({});
    await UrlStatModel.deleteMany({});
  }
}

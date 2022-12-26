import Mapper from '../../../common/mapper';
import MessageDto from '../dtos/message.dto';
import Message from '../message.model';

export default class MessageToDtoMapper implements Mapper<Message, MessageDto> {
  map(source?: Message): MessageDto {
    if (source) {
      return new MessageDto({
        id: source.id,
        text: source.text,
        roomId: source.room.id,
        username: source.user.username,
        userId: source.user.id,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        version: source.version,
      });
    }
    return undefined;
  }

  mapList(sources?: Message[]): MessageDto[] {
    return sources?.map((s) => this.map(s)) ?? [];
  }
}

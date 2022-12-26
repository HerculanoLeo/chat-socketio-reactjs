export default interface Mapper<S, T> {
  map(source?: S): Promise<T | undefined> | T | undefined;

  mapList(sources?: S[]): Promise<T[]> | T[];
}

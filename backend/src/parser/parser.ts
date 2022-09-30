export interface Parser<DATA = unknown> {
  parseUsers(data: DATA): ReadonlyArray<unknown>
}

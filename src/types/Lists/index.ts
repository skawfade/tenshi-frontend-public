export interface Lists {
  favorites: List
  watched: List
  watching: List
  planned: List
} 

export interface List {
  ids: string[]
  count: number
}
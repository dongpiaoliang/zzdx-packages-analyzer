export interface PackageInfo {
  name: string
  version: string
  dependencies: PackageInfo[]
}

export interface EchartsNode {
  name: string
  id: string
  value: string
  symbolSize: number
  x: number
  y: number
  category: string
}

export interface EchartsLink {
  source: string
  target: string
}
export interface EchartsCategory {
  name: string
}

import instance from './instance'
import * as ghUtil from './util'
export const Geocode = (params: { q: string }) =>
  instance.get('/geocode', { params })
export const Route = (params: { point: string[] }) =>
  new Promise((resolve, reject) => {
    const defaults = {
      points_encoded: true,
      instructions: true,
      elevation: true,
    }
    const reqArgs = { ...defaults, ...params }
    instance
      .get('/route', { params:reqArgs })
      .then((res) => {
        if (res.status !== 200) {
          reject(ghUtil.extractError(res, '/route'))
          return
        }
        if (res.data.paths) {
          for (let i = 0; i < res.data.paths.length; i++) {
            let path = res.data.paths[i]
            // convert encoded polyline to geo json
            if (path.points_encoded) {
              let tmpArray = ghUtil.decodePath(path.points, reqArgs.elevation)
              path.points = {
                type: 'LineString',
                coordinates: tmpArray,
              }

              let tmpSnappedArray = ghUtil.decodePath(
                path.snapped_waypoints,
                reqArgs.elevation
              )
              path.snapped_waypoints = {
                type: 'LineString',
                coordinates: tmpSnappedArray,
              }
            }
            if (path.instructions) {
              for (let j = 0; j < path.instructions.length; j++) {
                // Add a LngLat to every instruction
                let interval = path.instructions[j].interval
                // The second parameter of slice is non inclusive, therefore we have to add +1
                path.instructions[j].points = path.points.coordinates.slice([
                  interval[0],
                  interval[1] + 1,
                ])
              }
            }
          }
        }
        resolve(res.data)
      })
      .catch((err) => {
        reject(ghUtil.extractError(err.response, '/route'))
      })
  })

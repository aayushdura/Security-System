import { request } from 'src/utils/requests'
import { visitorFetchStart, allVisitorsFetchSuccess, visitorFetchFailure } from './visitorSlice'

export const getAllVisitors = (params) => {
  return async function (dispatch) {
    dispatch(visitorFetchStart())
    try {
      console.log(params)

      let res = await request.searchVisitor({ params })
      dispatch(allVisitorsFetchSuccess(res.data.visitorRegistration))
    } catch (err) {
      dispatch(visitorFetchFailure(err))
      console.log(err)
    }
  }
}

// 导入全部， 并命名为cardsService
import * as cardsService from '../service/cards'

// 默认暴露一个对象,
export default {

    namespace: 'cards',

    state: {
        cardsList: [],
        statistic: {},
    },

    effects: {
        // 查
        *queryList({ _ }, { call, put }) {
            const rsp = yield call(cardsService.queryList)
            console.log('queryList')
            console.log(rsp)
            yield put({ type: 'saveList', payload: { cardsList: rsp.result } })
        },

        // 删除
        *deleteOne({ payload }, { call, put }) {
            const rsp = yield call(cardsService.deleteOne, payload)
            console.log('deleteOne')
            console.log(rsp)
            return rsp
        },
        // 添加
        *addOne({ payload }, { call, put }) {
            const rsp = yield call(cardsService.addOne, payload)
            yield put({ type: 'queryList' })
            return rsp
        },

        //
        *getStatistic({ payload }, { call, put }) {
            const rsp = yield call(cardsService.getStatistic, payload)
            yield put({
                type: 'saveStatistic',
                payload: {
                    id: payload,
                    data: rsp.result,
                },
            })
            return rsp
        },
    },

    // reducer函数
    reducers: {
        saveList(state, { payload: { cardsList } }) {
            return {
                ...state,
                cardsList,
            }
        },
        saveStatistic(state, { payload: { id, data } }) {
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    [id]: data,
                },
            }
        },
    },
}


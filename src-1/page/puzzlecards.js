import React, { Component } from 'react'
import { Card ,Button } from 'antd'
import { connect } from 'dva'

const namespace = 'puzzlecards'

const mapStateToProps = (state) => {
    // 读取当前的状态数据
    const cardList = state[namespace].data
    const counter = state[namespace].counter
    return {
        cardList,
        counter,
    }
}

// 分发action对象
const mapDispatchToProps = (dispatch) => {
    return {
        // 点击交互的回调函数
        onClickAdd: (newCard) => {
            const action = {
                type: `${namespace}/addNewCard`,
                payload: newCard,
            }
            dispatch(action)
        },
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
    render() {
        const {cardList, counter} = this.props
        return (
            <div>
                {
                    cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.setup}</div>
                                <div>
                                    <strong>A: {card.punchline}</strong>
                                </div>
                            </Card>
                        )
                    })
                }
                <div>
                    <Button onClick={() => this.props.onClickAdd({
                        setup: `第${counter}次提问？`,
                        punchline: `第${counter}次回答`,
                    })}> 添加卡片 </Button>
                </div>
            </div>
        )
    }
}

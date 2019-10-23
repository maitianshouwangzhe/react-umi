import React, { Component } from 'react'
import { Card } from 'antd'
import { connect } from 'dva'

const namespace = 'puzzlecards'

const mapStateToProps = (state) => {
    // 第一种写法：需定义namespace
    return {
        cardList: state[namespace].data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reqInitCards: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            })
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)

export default class PuzzleCardsPage extends Component {

    // 注入reqInitCards()方法， 类似于构造一个函数, 返回值为一个action对象
    componentDidMount() {
        this.props.reqInitCards()
    }

    render() {
        return (
            <div>
                {
                    this.props.cardList.map(card => {
                        return (
                            <Card key={card.id}>
                                <div>Q: {card.title}</div>
                                <div>
                                    <strong>A: {card.body}</strong>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards';

const mapStateToProps = (state) => {
    const cardList = state[namespace].data;
    return {
        cardList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryInitCards`,
            });
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)

export default class PuzzleCardsPage extends Component {
    componentDidMount() {
        this.props.onDidMount();
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
                        );
                    })
                }
            </div>
        );
    }
}

/*
* 官网给的完整例子
* */

import React from 'react'
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'
import SampleChart from '../../component/SampleChart'

const FormItem = Form.Item

class List extends React.Component {

    state = {
        visible: false,
        statisticVisible: false,
        id: null,
    }

    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'desc',
        },
        {
            title: '链接',
            dataIndex: 'url',
            render(value) {
                return (
                    <a href={value} target='_blank'>{value}</a>
                )
            },
        },
        {
            title: '',
            dataIndex: 'statistic',
            render: (_, { id }) => {
                return (
                    <Button onClick={() => { this.showStatistic(id) }}>图表</Button>
                )
            },
        },
    ]

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        })
    }

    showModal = () => {
        this.setState({ visible: true })
    }

    showStatistic = (id) => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload: id,
        })
        this.setState({ id, statisticVisible: true })
    }

    handleOk = () => {
        const { dispatch, form: { validateFields } } = this.props

        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'cards/addOne',
                    payload: values,
                })
                this.setState({ visible: false })
            }
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }

    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false,
        })
    }

    render() {
        const { visible, statisticVisible, id } = this.state
        const { cardsList, cardsLoading, form: { getFieldDecorator }, statistic } = this.props

        return (
            <div>
                <Button type='primary' style={{marginBottom: 15}} onClick={this.showModal}>新建</Button>

                <Table
                    bordered
                    columns={this.columns}
                    dataSource={cardsList}
                    loading={cardsLoading}
                    rowKey="id"
                />
                <Modal
                    title="新建"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <FormItem label="名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc',{
                                rules: [{ required: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [
                                    { type: 'url' },
                                ],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>

                <Modal
                    visible={statisticVisible}
                    footer={null}
                    onCancel={this.handleStatisticCancel}
                >
                    {/*<SampleChart data={statistic[id]} />*/}
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardsList: state.cards.cardsList,
        cardsLoading: state.loading.effects['cards/queryList'],
        statistic: state.cards.statistic,
    }
}

export default connect(mapStateToProps)(Form.create()(List))

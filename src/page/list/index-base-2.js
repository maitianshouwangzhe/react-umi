/*
* 基于官方的教程修改
*
* */

import React from 'react'
import { Table, Modal, Button, Form, Input, Popconfirm, Icon, message } from 'antd'
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
            title: '统计图',
            dataIndex: 'statistic',
            render: (_, { id }) => {
                return (
                    <Button onClick={ () => { this.showStatistic(id) }}>图表</Button>
                )
            },
        },
        {
            title: '操作',
            render: (record) => (
                <span>
                    <a style={{marginRight: 15}} onClick={ ()=> this.showUpdateModal(record)}>修改</a>
                      <Popconfirm
                          title="你确定删除么？"
                          onConfirm={this.confirm}
                          onCancel={this.cancel}
                          okText="是"
                          cancelText="否"
                          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                      >
                          <a href="#">删除</a>
                      </Popconfirm>
                </span>
            ),
        },
    ]

    confirm=(e)=>{
        console.log(e)
        message.success('删除成功')
    }

    cancel=(e)=> {
        console.log(e)
        message.error('取消删除')
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'cards/queryList',
        })
    }

    // 虽然修改和添加使用同一个Modal框，但显示该Modal框的方法并不相同
    // 显示修改的Modal框
    showUpdateModal = (record) => {
        this.record = record
        this.setState({ visible: true })
    }

    // 显示增加的Modal框
    showAddModal= () => {
        this.record = null
        this.setState({ visible: true })
    }


    showStatistic = (id) => {
        this.props.dispatch({
            type: 'cards/getStatistic',
            payload: id,
        })
        this.setState({ id, statisticVisible: true })
    }


    // 添加的接口
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
        this.props.form.resetFields()
        this.setState({visible: false})
    }

    handleStatisticCancel = () => {
        this.setState({
            statisticVisible: false,
        })
    }

    render() {
        const { visible, statisticVisible, id } = this.state
        const { cardsList, cardsLoading, form: { getFieldDecorator }, statistic } = this.props
        const record = this.record || {}
        return (
            <div>
                <Button type='primary' style={{marginBottom: 15}} onClick={this.showAddModal}>新增</Button>

                <Table
                    bordered
                    columns={this.columns}
                    dataSource={cardsList}
                    loading={cardsLoading}
                    rowKey="id"
                />
                {/*   修改和添加使用同一个Modal框  */}
                <Modal
                    title={ record.id  ?  "修改" : '新增'}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel = { this.handleCancel }
                >
                    <Form>
                        <FormItem label="名称">
                            {
                                getFieldDecorator('name', {
                                    initialValue: record.name,
                                    rules: [
                                        { required: true }
                                        ],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem label="描述">
                            {
                                getFieldDecorator('desc',{
                                    initialValue: record.desc,
                                    rules: [
                                        { required: true }
                                        ],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem label="链接">
                            {
                                getFieldDecorator('url', {
                                    initialValue: record.url,
                                    rules: [
                                        { type: 'url' },
                                    ],
                                })(<Input />)
                            }
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

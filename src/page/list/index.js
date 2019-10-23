import React from 'react'
// 删除 最常用的组件为气泡确认框：Popconfirm
import { Table, Modal, Button, Form, Input, Popconfirm, message, Icon } from 'antd'
import { connect } from 'dva'
import SampleChart from '../../component/SampleChart'

const FormItem = Form.Item

class List extends React.Component {

    state = {
        update:false,
        add: false,
        // visible: false,
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
            title: '图表',
            dataIndex: 'statistic',
            render: (_, {id}) => {
                return (
                    <Button onClick={() => {this.showStatistic(id)}}>图表</Button>
                )
            },
        },
        {
            title: '操作',
            render: ( item ) => {
                // console.log(item)
                return <span>
                    <a style={{marginRight: 15}} onClick={()=>this.showModal('update', item)}>修改</a>
                    <Popconfirm
                        title="你确定删除吗？"
                        icon={ <Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="是"
                        cancelText="否"
                    >
                        <a href="#">删除</a>
                    </Popconfirm>
                </span>
            }
        }

    ]

    confirm = (e) => {
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

    // 点击添加，显示添加的对话框
    showModal = (type, item) => {
        if (item !== {} ){
            console.log(item)
            this.item = item
        } else {
            this.item = null
        }

        this.setState({
            [type]: true
        })
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
        const { add, update, statisticVisible, id } = this.state
        const { cardsList, cardsLoading, form: { getFieldDecorator }, statistic } = this.props
        const item = this.item || {}
        // debugger
        return (
            <div>
                <Button type='primary' onClick={()=>this.showModal('add', {})} style={{marginBottom: 20}}>添加</Button>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={cardsList}
                    loading={cardsLoading}
                    rowKey="id"
                />

                <Modal
                    title= {  item ? "修改" : "添加"}
                    visible={ (item === {} || null ) ?  add : update }
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
                            {getFieldDecorator('desc')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="链接">
                            {getFieldDecorator('url', {
                                rules: [{ type: 'url' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Form>
                </Modal>

                <Modal visible={statisticVisible} footer={null} onCancel={this.handleStatisticCancel}>
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

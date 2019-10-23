
// 模拟服务端的数据， 取出的是这里的数据，不再是服务端的数据
let data = [
    {
        id: 1,
        name: 'umi',
        desc: '极快的类 Next.js 的 React 应用框架。',
        url: 'https://umijs.org/zh/'
    },
    {
        id: 2,
        name: 'antd',
        desc: '一个服务于企业级产品的设计体系, 普通版。',
        url: 'https://ant.design/index-cn'
    },
    {
        id: 3,
        name: 'antd-pro',
        desc: '一个服务于企业级产品的设计体系， pro版本。',
        url: 'https://pro.ant.design/index-cn'
    }
]



// 暴露一个对象， 其中key包括三部分为：请求类型（get, post）， 空格， 请求地址(url)， 值就是函数
export default {
    'get /api/cards': function (req, res, next) {
        setTimeout(() => {
            res.json({
                result: data,
            })
        }, 250)
    },
    'delete /api/cards/:id': function (req, res, next) {
        data = data.filter(v => v.id !== parseInt(req.params.id))
        console.log(req.params.id)
        console.log(data)
        setTimeout(() => {
            res.json({
                success: true,
            })
        }, 250)
    },
    'post /api/cards/add': function (req, res, next) {
        data = [...data, {
            ...req.body,
            id: data[data.length - 1].id + 1,
        }]

        res.json({
            success: true,
        })
    },
    'get /api/cards/:id/statistic': function (req, res, next) {
        res.json({
            result: [
                { genre: 'Sports', sold: 275 },
                { genre: 'Strategy', sold: 1150 },
                { genre: 'Action', sold: 120 },
                { genre: 'Shooter', sold: 350 },
                { genre: 'Other', sold: 150 },
            ]
        })
    },
}

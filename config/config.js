// 配置文件

export default {
    // 将自定义的文件名为单数的同样识别。如page， modal。默认为复数
    singular: true,
    // 插件
    plugins: [
        ['umi-plugin-react', {
            // 插件相应的配置
            antd: true,
            dva: true,
            // 配置 locale，使应用国际化， 前台页面显示是中文或英文
            locale: {
                enable: true,
            },
        }],
    ],

    // 配置式的路由
    // （path为字符串，components均为相当page目录的相对路径）
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            {
                path: 'helloworld',
                component: './Helloworld'
            },
            {
                path: 'dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: './Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: './Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: './Dashboard/Workplace' }
                ]
            },
            { path: 'puzzlecards', component: './puzzlecards'},
            // 由于list文件夹下只有index.js这一个文件，且在项目中index是默认的，可以这样写
            { path: 'list', component: './list' },
            { path: 'cards', component: './cards' },
            { path: 'users', component: './Users/user' },
        ]
    }],

    // 配置代理请求
     proxy: {
        '/dev': {
             target: "http://jsonplaceholder.typicode.com",
             changeOrigin: true,
             pathRewrite: { "^/dev": "" }
             }
     }
}

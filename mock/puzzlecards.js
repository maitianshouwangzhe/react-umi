
// 模拟服务端的数据， 取出的是这里的数据，不再是服务端的数据
const random_jokes = [
    {
        title: 'What is the object oriented way to get wealthy ?',
        body: 'Inheritance',
    },
    {
        title: 'To understand what recursion is...',
        body: "You must first understand what recursion is",
    },
    {
        title: 'What do you call a factory that sells passable products?',
        body: 'A satisfactory',
    },
    {
        title: '你想要取服务端的数据？？？？',
        body: '耶，取到了',
    },
];


let random_joke_call_count = 0;

// 暴露一个对象， 其中key包括三部分为：请求类型（get, post）， 空格， 请求地址(url)， 值就是函数
export default {
    'get /dev/posts/1': function (req, res) {
        // 请求到的目标数据
        const responseObj = random_jokes[random_joke_call_count % random_jokes.length];
        random_joke_call_count += 3;
        setTimeout(() => {
            res.json(responseObj);
        }, 1000);
    },
};

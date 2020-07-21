const routers = [
    {
        path: '/atc_demo_ui',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    }
];
export default routers;
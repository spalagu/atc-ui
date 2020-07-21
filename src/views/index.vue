<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<style lang="less">
    .ivu-card-head p {
        height: 30px!important;
        line-height: 30px!important;
    }
</style>
<template>
    <Card style="width:100%;height:100%;max-width:900px;margin-right:auto;margin-left:auto;" :padding=0>
        <p slot="title" v-if="shaped">
            <Icon type="md-phone-portrait" />
            {{deviceName}}
            <tag color="error" checked>弱网</tag>
        </p>
        <p slot="title" v-else>
            <Icon type="md-phone-portrait" />
            {{deviceName}}
            <tag color="success">正常</tag>
        </p>
        <a href="#" slot="extra" @click.prevent="openChangeDeviceModel">
            <Icon type="ios-loop-strong"></Icon>
            更换设备
        </a>
        <Tabs>
            <TabPane label="参数配置" icon="md-cog">
                <div style="margin: 0px 16px 16px 16px;">
                    <Button :disabled="!shaped" type="warning" size="small" @click="unSetShape">重置配置</Button>
                    <Button type="info" size="small" @click="openSaveShapeModel">保存为快捷配置</Button>
                    <Button type="primary" size="small" @click="setShape">应用配置</Button>
                </div>
                <Divider orientation="left">下行</Divider>
                <div style="margin: 0px 16px 16px 16px;">
                    <Form ref="shape.down" :model="shape.down" :label-width="120">
                        <FormItem label="带宽[kbps]">
                            <Input v-model="shape.down.rate" placeholder="带宽[kbps]"/>
                        </FormItem>
                        <FormItem label="丢包率[%]">
                            <Input v-model="shape.down.loss.percentage" placeholder="丢包率[%]"/>
                        </FormItem>
                        <FormItem label="丢包率-相关性[%]">
                            <Input v-model="shape.down.loss.correlation" placeholder="丢包率-相关性[%]"/>
                        </FormItem>
                        <FormItem label="延迟[毫秒]">
                            <Input v-model="shape.down.delay.delay" placeholder="延迟[毫秒]"/>
                        </FormItem>
                        <FormItem label="延迟-抖动[%]">
                            <Input v-model="shape.down.delay.jitter" placeholder="延迟-抖动[%]"/>
                        </FormItem>
                        <FormItem label="延迟-相关性[%]">
                            <Input v-model="shape.down.delay.correlation" placeholder="延迟-相关性[%]"/>
                        </FormItem>
                        <FormItem label="错误包[%]">
                            <Input v-model="shape.down.corruption.percentage" placeholder="错误包[%]"/>
                        </FormItem>
                        <FormItem label="错误包-相关性[%]">
                            <Input v-model="shape.down.corruption.correlation" placeholder="错误包-相关性[%]"/>
                        </FormItem>
                        <FormItem label="乱序[%]">
                            <Input v-model="shape.down.reorder.percentage" placeholder="乱序[%]"/>
                        </FormItem>
                        <FormItem label="乱序-相关性[%]">
                            <Input v-model="shape.down.reorder.correlation" placeholder="乱序-相关性[%]"/>
                        </FormItem>
                        <FormItem label="乱序-间隔[整数]">
                            <Input v-model="shape.down.reorder.gap" placeholder="乱序-间隔[整数]"/>
                        </FormItem>
                    </Form>
                </div>
                <Divider orientation="left">上行</Divider>
                <div style="margin: 0px 16px 16px 16px;">
                    <Form ref="shape.up" :model="shape.up" :label-width="120">
                        <FormItem label="带宽[kbps]">
                            <Input v-model="shape.up.rate" placeholder="带宽[kbps]"/>
                        </FormItem>
                        <FormItem label="丢包率[%]">
                            <Input v-model="shape.up.loss.percentage" placeholder="丢包率[%]"/>
                        </FormItem>
                        <FormItem label="丢包率-相关性[%]">
                            <Input v-model="shape.up.loss.correlation" placeholder="丢包率-相关性[%]"/>
                        </FormItem>
                        <FormItem label="延迟[毫秒]">
                            <Input v-model="shape.up.delay.delay" placeholder="延迟[毫秒]"/>
                        </FormItem>
                        <FormItem label="延迟-抖动[%]">
                            <Input v-model="shape.up.delay.jitter" placeholder="延迟-抖动[%]"/>
                        </FormItem>
                        <FormItem label="延迟-相关性[%]">
                            <Input v-model="shape.up.delay.correlation" placeholder="延迟-相关性[%]"/>
                        </FormItem>
                        <FormItem label="错误包[%]">
                            <Input v-model="shape.up.corruption.percentage" placeholder="错误包[%]"/>
                        </FormItem>
                        <FormItem label="错误包-相关性[%]">
                            <Input v-model="shape.up.corruption.correlation" placeholder="错误包-相关性[%]"/>
                        </FormItem>
                        <FormItem label="乱序[%]">
                            <Input v-model="shape.up.reorder.percentage" placeholder="乱序[%]"/>
                        </FormItem>
                        <FormItem label="乱序-相关性[%]">
                            <Input v-model="shape.up.reorder.correlation" placeholder="乱序-相关性[%]"/>
                        </FormItem>
                        <FormItem label="乱序-间隔[整数]">
                            <Input v-model="shape.up.reorder.gap" placeholder="乱序-间隔[整数]"/>
                        </FormItem>
                    </Form>
                </div>
            </TabPane>
            <TabPane label="快捷配置" icon="md-link" :disabled="false">
                <div style="margin: 0px 16px 16px 16px;">
                    <Button :disabled="!shaped" type="warning" size="small" @click="unSetShape">重置配置</Button>
                    <Poptip
                    transfer
                    confirm
                    placement="bottom-start"
                    title="确定要清除全部快捷配置?"
                    @on-ok="clearAllSavedShape">
                        <Button type="error" size="small">清除全部快捷配置</Button>
                    </Poptip>
                </div>
                <CellGroup v-for="(shapeName, index) in savedShapeNames" :key="index">
                    <Cell :title="shapeName">
                        <Icon type="ios-bookmark" slot="icon"/>
                        <span slot="extra" >
                            <Poptip
                            transfer
                            confirm
                            placement="bottom-end"
                            title="确定要删除快捷配置?"
                            @on-ok="deleteSavedShape(shapeName)">
                                <Button type="error" size="small">删除</Button>
                            </Poptip>
                            <Button type="primary" size="small" @click="setSavedShape(shapeName)">应用</Button>
                        </span>
                    </Cell>
                </CellGroup>
            </TabPane>
        </Tabs>
        <Modal
        v-model="showChangeDeviceModel"
        title="更换目标设备"
        :styles="{top: '20px'}">
            <Input v-model="deviceIP" size="large" clearable placeholder="输入目标设备IP，例如192.168.100.2" />
            <div slot="footer">
                <Button type="warning" size="large" @click="resetDevice">重置为本机</Button>
                <Button type="default" size="large" @click="cancelChangeDevice">取消</Button>
                <Button type="primary" size="large" @click="changeDevice">确定</Button>
            </div>
        </Modal>
        <Modal
        v-model="showSaveShapeModel"
        title="保存快捷配置"
        :styles="{top: '20px'}"
        @on-ok="saveShape">
            <Input v-model="currentShapeName" size="large" clearable placeholder="快捷配置名称" />
        </Modal>
    </Card>
</template>
<script>
    const axios = require("axios");
    export default {
        name: 'index',
        components:{
        },
        data() {
            return {
                axiosCancelFunc:null,
                deviceIP: 'localhost',
                lastDeviceIp: 'localhost',
                shaped:true,
                shape:{
                    down: {
                        rate: null,
                        loss: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        delay: {
                            delay: 0,
                            jitter: 0,
                            correlation: 0.0
                        },
                        corruption: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        reorder: {
                            percentage: 0.0,
                            correlation: 0.0,
                            gap: 0
                        },
                        iptables_options: []
                    },
                    up: {
                        rate: null,
                        loss: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        delay: {
                            delay: 0,
                            jitter: 0,
                            correlation: 0.0
                        },
                        corruption: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        reorder: {
                            percentage: 0.0,
                            correlation: 0.0,
                            gap: 0
                        },
                        iptables_options: []
                    },
                },
                shape_default:{
                    down: {
                        rate: null,
                        loss: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        delay: {
                            delay: 0,
                            jitter: 0,
                            correlation: 0.0
                        },
                        corruption: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        reorder: {
                            percentage: 0.0,
                            correlation: 0.0,
                            gap: 0
                        },
                        iptables_options: []
                    },
                    up: {
                        rate: null,
                        loss: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        delay: {
                            delay: 0,
                            jitter: 0,
                            correlation: 0.0
                        },
                        corruption: {
                            percentage: 0.0,
                            correlation: 0.0
                        },
                        reorder: {
                            percentage: 0.0,
                            correlation: 0.0,
                            gap: 0
                        },
                        iptables_options: []
                    },
                },
                showChangeDeviceModel: false,
                showSaveShapeModel: false,
                currentShapeName: '我的配置',
                savedShapeNames: [],
            };
        },
        methods: {
            cancelAxiosRequest() {
                if(typeof this.axiosCancelFunc ==='function'){
                    this.axiosCancelFunc('cancel');
                }
            },
            openChangeDeviceModel(){
                this.showChangeDeviceModel = true;
                this.lastDeviceIp = this.deviceIP;
            },
            changeDevice(){
                if (this.deviceIP == ''){
                    this.deviceIP = 'localhost';
                }
                this.showChangeDeviceModel = false;
                this.getShape();
            },
            cancelChangeDevice(){
                this.showChangeDeviceModel = false;
                this.deviceIP = this.lastDeviceIp;
            },
            resetDevice(){
                this.showChangeDeviceModel = false;
                this.deviceIP = 'localhost';
                this.getShape();
            },
            openSaveShapeModel(){
                this.showSaveShapeModel = true;
            },
            saveShape(shapeName) {
                localStorage.setItem(this.currentShapeName,JSON.stringify(this.shape))
                this.currentShapeName = '我的配置'
                this.updateSavedShapeNames()
            },
            setSavedShape(shapeName){
                var savedShape=localStorage.getItem(shapeName)
                if (savedShape){
                    this.shape=JSON.parse(savedShape);
                    this.setShape();
                }else{
                    this.$Message.error('应用快捷配置失败');
                }
            },
            deleteSavedShape(shapeName){
                localStorage.removeItem(shapeName);
                this.updateSavedShapeNames()
            },
            updateSavedShapeNames(){
                this.savedShapeNames=[]
                var savedShapeNum = localStorage.length;
                for (var i = 0; i < savedShapeNum; i++) {
                    var savedShapeName = localStorage.key(i)
                    if (savedShapeName != 'loglevel:webpack-dev-server'){
                        this.savedShapeNames.push(savedShapeName)
                    }
                }
            },
            clearAllSavedShape(){
                localStorage.clear();
                this.updateSavedShapeNames();
            },
            getShape() {
                const _this = this;
                const headers = {
                    'Content-Type': 'application/json',
                }
                if (this.deviceIP=='localhost'){
                    var baseUrl="/api/v1/shape/"
                }else{
                    var baseUrl="/api/v1/shape/" + this.deviceIP + "/"
                }
                axios
                .get(
                    // "http://localhost:10000" +
                    baseUrl,
                    {
                        headers: headers,
                        cancelToken: new axios.CancelToken(function executor(func) {
                            _this.axiosCancelFunc = func;
                        }),
                    },
                )
                .then(response => {
                    if(response.status==200){
                        this.shaped=true;
                        this.shape=response.data;
                    }
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('axios canceled', error.message);
                    } else {
                        if (error && error.response) {
                            if (error.response.status == 404 && error.response.data.hasOwnProperty('detail')){
                                this.shaped=false;
                                this.shape=JSON.parse(JSON.stringify(this.shape_default));
                            }
                            else{
                                this.$Message.error('获取设备信息失败');
                            }
                        }
                    }
                })
                .then(() => {
                    //finally
                });
            },
            setShape() {
                if (JSON.stringify(this.shape) !== JSON.stringify(this.shape_default)){
                    const _this = this;
                    const headers = {
                        'Content-Type': 'application/json',
                    }
                    if (this.deviceIP=='localhost'){
                        var baseUrl="/api/v1/shape/"
                    }else{
                        var baseUrl="/api/v1/shape/" + this.deviceIP + "/"
                    }
                    axios
                    .post(
                        // "http://localhost:10000" +
                        baseUrl,
                        this.shape,
                        {headers: headers}
                    )
                    .then(response => {
                        if(response.status==201){
                            this.$Message.success('更改成功');
                        }
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            console.log('axios canceled', error.message);
                        } else {
                            console.log(error);
                            this.$Message.error('更改失败');
                            
                        }
                    })
                    .then(() => {
                        //finally  
                        this.getShape()
                    });
                }
            },
            unSetShape() {
                const _this = this;
                const headers = {
                    'Content-Type': 'application/json',
                }
                if (this.deviceIP=='localhost'){
                    var baseUrl="/api/v1/shape/"
                }else{
                    var baseUrl="/api/v1/shape/" + this.deviceIP + "/"
                }
                axios
                .delete(
                    // "http://localhost:10000" +
                    baseUrl,
                    {headers: headers}
                )
                .then(response => {
                    if(response.status==204){
                        this.$Message.success('重置成功');
                        this.shaped=false;
                        this.shape=JSON.parse(JSON.stringify(this.shape_default));
                    }
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('axios canceled', error.message);
                    } else {
                        console.log(error);
                        this.$Message.error('重置失败');
                        this.getShape()
                    }
                })
                .then(() => {
                    //finally
                });
            },
        },
        computed: {
            deviceName: function () {
                if (this.deviceIP == 'localhost'){
                    return '当前设备';
                }
                else{
                    return this.deviceIP;
                }
            },
        },
        mounted() {
            this.updateSavedShapeNames()
            this.getShape()
        }
    }
</script>

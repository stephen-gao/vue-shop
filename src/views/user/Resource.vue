<template>
    <div style="height: 100%">
        <el-container>
            <el-aside style="border-right: 3px solid #304156;min-height: 100%">
                <el-row style="text-align: left;padding-top: 5px;padding-left: 10px;">
                    <span style="margin-top: 10px;text-align: left">
                    <el-button type="danger" size="mini" @click="removeNode()">删除</el-button>
                </span>
                </el-row>
                <el-tree :data="resourceTree"
                         :props="defaultProps"
                         node-key="id"
                         default-expand-all
                         show-checkbox
                         :expand-on-click-node="false"
                         @node-click="handleNodeClick">

                </el-tree>
            </el-aside>
            <el-main>
                <span style="text-align: left"><h1>添加资源节点</h1></span>
                <div style="margin-top: 20px;text-align: left">
                    <el-form style="width: 400px" :model="newNode" :rules="rules" ref="newNode" status-icon label-width="100px" size="small">
                        <el-form-item label="id">
                            <el-input v-model="newNode.id"></el-input>
                        </el-form-item>
                        <el-form-item label="父节点id" >
                            <el-input v-model="newNode.parentId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="父节点" prop="parentName">
                            <el-input v-model="newNode.parentName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="节点名称" prop="name">
                            <el-input v-model="newNode.name"></el-input>
                        </el-form-item>
                        <el-form-item label="节点编码" prop="code">
                            <el-input v-model="newNode.code"></el-input>
                        </el-form-item>
                        <el-form-item label="节点排序">
                            <el-input v-model="newNode.sort"></el-input>
                        </el-form-item>
                        <el-form-item label="访问路径">
                            <el-input v-model="newNode.path"></el-input>
                        </el-form-item>
                        <el-form-item label="页面路径">
                            <el-input v-model="newNode.component"></el-input>
                        </el-form-item>
                        <el-form-item label="图标">
                            <el-input v-model="newNode.icon"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-input v-model="newNode.state"></el-input>
                        </el-form-item>
                        <el-form-item label="访问鉴权">
                            <el-switch v-model="newNode.reqAuth"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addNode()" :loading="loading">创建节点</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import resourceApi from "../../api/resource"
    import console from "console"

    export default {
        name: "Resource",
        data() {
            return {
                resourceTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                newNode:{
                    id:'',
                    parentId:'',
                    parentName:'',
                    name:'',
                    code:'',
                    sort:5,
                    path:'',
                    component:'',
                    icon:'',
                    state:0,
                    reqAuth:true
                },
                rules: {
                    parentName: [
                        {required: true, message: '请输入选择父节点', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入资源名称', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请输入资源名称', trigger: 'blur'},
                    ]
                },
                loading: false
            }
        },
        created() {
            this.queryData()
        },
        methods: {
            queryData() {
                resourceApi.resourceTree().then(response => {
                    this.resourceTree = response.data;
                }).catch(() => {

                })
            },
            handleNodeClick(data) {
                console.log(data);
                this.newNode.parentId = data.id;
                this.newNode.parentName = data.name
            },
            addNode(){
                this.$refs.newNode.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        resourceApi.add(this.newNode).then(response => {
                            this.loading = false;
                            this.$message({
                                message: response.message,
                                type: 'success',
                                duration: 3000
                            });
                            this.formRefrash();
                            this.queryData()
                        }).catch(() => {
                            this.loading = false;
                        })
                    } else {
                        this.$message({
                            message: '请正确填写表单',
                            type: 'error',
                            duration: 3000
                        });
                        return false;
                    }
                });
            },
            removeNode(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            formRefrash(){
                this.newNode = {
                    id:'',
                    parentId:'',
                    parentName:'',
                    name:'',
                    code:'',
                    sort:5,
                    path:'',
                    component:'',
                    icon:'',
                    state:0,
                    reqAuth:true
                }
            }
        }
    }
</script>

<style scoped>

</style>
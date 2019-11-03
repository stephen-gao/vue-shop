<template>
    <div style="height: 100%">
        <el-container>
            <el-aside style="border-right: 3px solid #304156;min-height: 100%">
                <el-row style="text-align: left;padding-top: 5px;padding-left: 10px;padding-bottom: 10px;">
                    <span style="margin-top: 10px;text-align: left">请点击节点操作</span>
                </el-row>
                <el-tree :data="resourceTree"
                         :props="defaultProps"
                         node-key="id"
                         default-expand-all
                         :expand-on-click-node="false"
                         @node-click="handleNodeClick">

                </el-tree>
            </el-aside>
            <el-main>
                <span style="text-align: left"><h1>资源节点</h1></span>
                <div style="margin-top: 20px;text-align: left">
                    <el-form style="width: 400px" :model="treeChecdNode" :rules="rules" ref="treeChecdNode" status-icon label-width="100px" size="small">
                        <el-form-item label="id" hidden>
                            <el-input v-model="treeChecdNode.id"></el-input>
                        </el-form-item>
                        <el-form-item label="父节点id" hidden>
                            <el-input v-model="treeChecdNode.parentId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="父节点" prop="parentName" hidden>
                            <el-input v-model="treeChecdNode.parentName" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="节点名称" prop="name">
                            <el-input v-model="treeChecdNode.name"></el-input>
                        </el-form-item>
                        <el-form-item label="节点编码" prop="code">
                            <el-input v-model="treeChecdNode.code"></el-input>
                        </el-form-item>
                        <el-form-item label="节点排序">
                            <el-input v-model="treeChecdNode.sort"></el-input>
                        </el-form-item>
                        <el-form-item label="访问路径">
                            <el-input v-model="treeChecdNode.path"></el-input>
                        </el-form-item>
                        <el-form-item label="图标">
                            <el-input v-model="treeChecdNode.icon"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="treeChecdNode.type" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in nodeType"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="dialogAddNodeFormVisible=true" :loading="loading">创建子节点</el-button>
                            <el-button type="primary" @click="editNode()" v-if="treeChecdNode.id!=0" :loading="loading">编辑节点</el-button>
                            <el-button type="danger" @click="removeNode()" v-if="treeChecdNode.id!=0" :loading="loading">删除节点</el-button>

                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="新建资源节点" width="25%" :visible.sync="dialogAddNodeFormVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="newNode" :rules="rules" ref="newNode" status-icon label-width="100px" size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="newNode.id"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点id" hidden>
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
                    <el-form-item label="图标">
                        <el-input v-model="newNode.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="newNode.type" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in nodeType"
                                       :key="item.code"
                                       :label="item.name"
                                       :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addNode()" :loading="loading">创建节点</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import resourceApi from "../../api/resource"
    import console from "console"
    import sysdic from "@/api/sysdic"

    export default {
        name: "Resource",
        data() {
            return {
                resourceTree: [],
                nodeType:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeChecdNode:{},
                dialogAddNodeFormVisible: false,
                newNode:{
                    id:'',
                    parentId:'',
                    parentName:'',
                    name:'',
                    code:'',
                    sort:5,
                    path:'',
                    icon:'',
                    type:'0'
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
                loading: false,
                validateValue: true
            }
        },
        created() {
            this.queryData();
            this.querySysDic()
        },
        methods: {
            queryData() {
                resourceApi.resourceTree().then(response => {
                    this.resourceTree = response.data;
                }).catch(() => {

                })
            },
            querySysDic(){
                sysdic.dicitemsbtypeCode({typeCode:'sys_resource_item_type'}).then(response => {
                    this.nodeType = response.data;
                }).catch(() => {

                })
            },
            handleNodeClick(data) {
                console.log(data);
                this.treeChecdNode = data;
                this.newNode.parentId = data.id;
                this.newNode.parentName = data.name
            },
            validate(){
                this.$refs.newNode.validate((valid) => {
                    if(valid){
                        this.validateValue = false
                    }
                })
            },
            addNode(){
                this.validate()
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return
                }
                this.loading = true;
                resourceApi.add(this.newNode).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.formRefrash();
                    this.queryData();
                    this.dialogAddNodeFormVisible = false
                }).catch(() => {
                    this.loading = false;
                })
                this.validateValue = true
            },
            editNode(){
                this.loading = true;
                resourceApi.edit(this.treeChecdNode).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.formRefrash();
                    this.queryData();
                    this.dialogAddNodeFormVisible = false
                }).catch(() => {
                    this.loading = false;
                })
            },
            removeNode(){
                if(!this.treeChecdNode || !this.treeChecdNode.id){
                    this.$message({
                        message: '请选择节点',
                        type: 'error',
                        duration: 3000
                    });
                    return
                }
                if(this.treeChecdNode.children.length>0){
                    this.$message({
                        message: '含字节点，无法删除',
                        type: 'error',
                        duration: 3000
                    });
                    return
                }
                resourceApi.del({id:this.treeChecdNode.id}).then(response => {
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.treeChecdNode= {};
                    this.queryData()
                }).catch(() => {
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
                    icon:'',
                    type:'0'
                }
            }
        }
    }
</script>

<style scoped>

</style>
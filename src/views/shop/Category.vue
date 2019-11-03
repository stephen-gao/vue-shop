<template>
    <div style="height: 100%">
        <el-container>
            <el-aside style="border-right: 3px solid #304156;min-height: 100%">
                <el-row style="text-align: left;padding-top: 5px;padding-left: 10px;padding-bottom: 10px;">
                    <span style="margin-top: 10px;text-align: left">请点击节点操作</span>
                </el-row>
                <el-tree :data="categoryTree"
                         :props="defaultProps"
                         node-key="id"
                         default-expand-all
                         :expand-on-click-node="false"
                         @node-click="handleNodeClick">

                </el-tree>
            </el-aside>
            <el-main>
                <span style="text-align: left"><h1>分类节点</h1></span>
                <div style="margin-top: 20px;text-align: left">
                    <el-form style="width: 400px" :model="treeCheckedNode" :rules="rules" ref="treeCheckedNode"
                             status-icon
                             label-width="100px" size="small">
                        <el-form-item label="id" hidden>
                            <el-input v-model="treeCheckedNode.id"></el-input>
                        </el-form-item>
                        <el-form-item label="父节点id" hidden>
                            <el-input v-model="treeCheckedNode.parentId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="节点名称" prop="categoryName">
                            <el-input v-model="treeCheckedNode.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="节点排序">
                            <el-input v-model="treeCheckedNode.sort"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="dialogAddNodeFormVisible=true" :loading="loading">创建子节点
                            </el-button>
                            <el-button type="primary" @click="editNode()" v-if="treeCheckedNode.id!=0"
                                       :loading="loading">
                                编辑节点
                            </el-button>
                            <el-button type="danger" @click="removeNode()" v-if="treeCheckedNode.id!=0"
                                       :loading="loading">删除节点
                            </el-button>

                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="新建分类节点" width="25%" :visible.sync="dialogAddNodeFormVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="newNode" :rules="rules" ref="newNode" status-icon
                         label-width="100px" size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="newNode.id"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点id" hidden>
                        <el-input v-model="newNode.parentId" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="父节点" prop="parentName">
                        <el-input v-model="newNode.parentName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="节点名称" prop="categoryName">
                        <el-input v-model="newNode.categoryName"></el-input>
                    </el-form-item>
                    <el-form-item label="节点排序">
                        <el-input v-model="newNode.sort"></el-input>
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
    import categoryApi from '@/api/category'
    import console from 'console'

    export default {
        name: "Category",
        data() {
            return {
                categoryTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'categoryName'
                },
                treeCheckedNode: {
                    id: '',
                    categoryName: '',
                    parentId: '',
                    parentName: '',
                    sort: null
                },
                dialogAddNodeFormVisible: false,
                newNode: {
                    id: '',
                    categoryName: '',
                    parentId: '',
                    parentName: '',
                    sort: 5
                },
                rules: {
                    parentName: [
                        {required: true, message: '请输入选择父节点', trigger: 'blur'},
                    ],
                    categoryName: [
                        {required: true, message: '请输入资源名称', trigger: 'blur'},
                    ]
                },
                loading: false,
                validateValue: true

            }
        },
        created() {
            this.queryData()
        },
        methods: {
            queryData() {
                categoryApi.categoryTree().then(response => {
                    this.categoryTree = response.data;
                }).catch(() => {

                })
            },
            handleNodeClick(data){
                console.log(data);
                this.treeCheckedNode = data;
                this.newNode.parentId = data.id;
                this.newNode.parentName = data.categoryName
            },
            validate(){
                this.$refs.newNode.validate((valid) => {
                    if (valid) {
                        this.validateValue = false
                    }
                })
            },
            addNode(){
                this.validate();
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return
                }
                categoryApi.add(this.newNode).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.refreshForm();
                        this.dialogAddNodeFormVisible = false
                    }
                }).catch(() => {

                });
                this.validateValue = true
            },
            validateEdit(){
                this.$refs.treeCheckedNode.validate((valid) => {
                    if (valid) {
                        this.validateValue = false
                    }
                })
            },
            editNode(){
                this.validateEdit();
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return
                }
                categoryApi.edit(this.treeCheckedNode).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.dialogAddNodeFormVisible = false
                    }
                }).catch(() => {

                });
                this.validateValue = true
            },
            removeNode(){
                categoryApi.del({id:this.treeCheckedNode.id}).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.refreshForm();
                        this.dialogAddNodeFormVisible = false
                    }
                }).catch(() => {

                });
            },
            refreshForm(){
                this.treeCheckedNode = {
                    id: '',
                    categoryName: '',
                    parentId: '',
                    parentName: '',
                    sort: null
                };
                this.newNode.categoryName = '';
                this.newNode.parentId = '';
                this.newNode.parentName = ''
            }
        }
    }

</script>
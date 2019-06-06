<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.name" placeholder="请输入用户名"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="6">
                <div></div>
            </el-col>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium " @click="queryData">查询数据</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium" @click="dialogRoleAddVisible=true">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="loading"
                  element-loading-text="loading" border fit highlight-current-row>
            <!--<el-table-column prop="id" label="ID"/>-->
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="角色">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" :loading="loading" @click="get(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-pagenation">
            <el-pagination
                    background
                    @size-change="handlePageChange"
                    @current-change="handlePageChange"
                    :current-page="pageNum"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="prev, pager, next, sizes, total"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog title="添加角色" :visible.sync="dialogRoleAddVisible">
            <el-row>
                <el-col :span="12">
                    <el-form :model="role" :rules="rules" ref="role" status-icon label-width="100px">
                        <el-form-item label="ID" hidden>
                            <el-input v-model="role.id"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="name">
                            <el-input v-model="role.name"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input v-model="role.description"></el-input>
                        </el-form-item>
                        <el-form-item label="排序">
                            <el-input v-model="role.sort"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <div style="height: 350px">
                        <el-tree :data="resourceTree"
                                 :props="defaultProps"
                                 ref="tree"
                                 node-key="id"
                                 accordion
                                 :default-expanded-keys="defaultExpanded"
                                 show-checkbox
                                 :default-checked-keys="role.resourceIds"
                                 check-strictly
                        >

                        </el-tree>
                    </div>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" style="text-align: center">
                <el-button type="primary" v-if="!role.id" :loading="loading" @click="add">提交</el-button>
                <el-button type="primary" v-if="role.id" :loading="loading" @click="edit">编辑</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElInput from "element-ui/packages/input/src/input";
    import roleApi from '@/api/role'
    import resourceApi from "@/api/resource"
    import console from 'console'
    export default {
        name: "Role",
        components: {
            ElInput,
            ElCol,
            ElRow
        },
        data(){
            return {
                list: [],
                pageNum: 1,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
                total: 4,
                requestData: {
                    pageNum: null,
                    pageSize: null,
                    name: null
                },
                loading: false,
                role: {
                    id: '',
                    name: '',
                    description: '',
                    sort: '5',
                    resources: [],
                    resourceIds:[]
                },
                dialogRoleAddVisible: false,
                rules: {
                    name: [
                        {required: true, message: '请输入资源名称', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '请输入资源名称', trigger: 'blur'},
                    ]
                },
                resourceTree: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultExpanded: ['0'],
                validateValue: true
            }
        },
        created() {
            this.queryData();
            this.queryTree();
        },
        methods: {
            queryData() {
                this.loading = true;
                roleApi.page(this.requestData).then(response => {
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.pageNum = response.data.offset;
                    this.pageSize = response.data.size;
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            queryTree() {
                resourceApi.resourceTree().then(response => {
                    this.resourceTree = response.data;
                }).catch(() => {

                })
            },
            keyupEnter(){
                this.queryData();
            },
            handlePageChange(){
                this.queryData();
            },
            validate(){
                this.$refs.role.validate((valid) => {
                    if(valid){
                        this.validateValue = false
                    }
                })
            },
            add(){
                this.validate();
                if(this.validateValue){
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                this.role.resources = this.getCheckedNodes();
                this.loading = true;
                roleApi.add(this.role).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.queryData();
                    this.formRefrash();
                    this.dialogRoleAddVisible=false
                }).catch(() => {
                    this.loading = false;
                });
                this.validateValue = true
            },
            get(row){
                this.loading = true;
                roleApi.get({id:row.id}).then(response => {
                    this.role = response.data;
                    this.setCheckedKeys();
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                });
                this.dialogRoleAddVisible=true;
            },
            edit(){
                this.validate();
                if(this.validateValue){
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                this.role.resources = this.getCheckedNodes();
                console.log(this.role);
                this.loading = true;
                roleApi.edit(this.role).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.queryData();
                    this.formRefrash();
                    this.dialogRoleAddVisible=false;
                }).catch(() => {
                    this.loading = false;
                })
                this.validateValue = true
            },
            del(row){
                this.loading = true;
                roleApi.del({id:row.id}).then(response => {
                    this.queryData();
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                });
            },
            getCheckedNodes() {
                return this.$refs.tree.getCheckedNodes();
            },
            setCheckedKeys() {
                return this.$refs.tree.setCheckedKeys(this.role.resourceIds);
            },
            formRefrash(){
                this.role={
                    id: '',
                    name: '',
                    description: '',
                    sort: '5',
                    resources: [],
                    resourceIds:[]
                };
                this.$refs.tree.setCheckedNodes(this.role.resources)
            },
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>
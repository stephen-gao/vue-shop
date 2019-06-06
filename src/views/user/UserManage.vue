<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.username" placeholder="请输入用户名"
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
                    <el-button type="primary" size="medium " @click="queryData">刷新数据</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium" @click="dialogAddUserVisible=true">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="listLoading"
                  element-loading-text="Loading" border fit highlight-current-row>
            <!--<el-table-column prop="id" label="ID"/>-->
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="tel" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮件">
            </el-table-column>
            <el-table-column prop="roleId" label="角色">
                <template slot-scope="scope">
                    <span>{{scope.row.roleId | handlerFomartRole}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span>{{scope.row.state | handlerFomartState}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtCreate | handlerFomartTime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtUpdate" label="更新时间">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtUpdate | handlerFomartTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="get(scope.row)">编辑</el-button>
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
        <el-dialog title="用户" width="500px" :visible.sync="dialogAddUserVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="user" :rules="rules" ref="user" status-icon label-width="100px"
                         size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="user.id"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select v-model="user.roleId" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in roles"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="user.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="user.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-input v-model="user.photo"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="user.state" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in userStates"
                                       :key="item.code"
                                       :label="item.name"
                                       :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add()" :loading="loading">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

        <el-dialog title="用户" width="500px" :visible.sync="dialogEditUserVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="user" :rules="rules" ref="user" status-icon label-width="100px"
                         size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="user.id"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleId">
                        <el-select v-model="user.roleId" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in roles"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="user.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="user.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-input v-model="user.photo"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="user.state" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in userStates"
                                       :key="item.code"
                                       :label="item.name"
                                       :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="edit()" :loading="loading">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    import userApi from "@/api/user"
    import {parseTime} from "@/utils/formatUtils"
    import sysDic from "@/api/sysdic"
    import {roleFormat, sysDicFormat} from "../../utils/sysDicFormater"
    export default{
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
                    username: null
                },
                userStates: [],
                roles: [],
                listLoading: false,
                dialogAddUserVisible: false,
                dialogEditUserVisible: false,
                user: {
                    id: '',
                    username: '',
                    password: '',
                    nickname: '',
                    tel: '',
                    email: '',
                    photo: '',
                    state: '0',
                    roleId: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    roleId: [
                        {required: true, message: '请选择角色', trigger: 'blur'},
                    ]
                },
                loading: false,
                validateValue: true,
                userStateType: 'sys_user_manager_state'

            }
        },
        filters: {
            handlerFomartTime(data) {
                return parseTime(data)
            },
            handlerFomartRole(data){
                return roleFormat(data)
            },
            handlerFomartState(data){
                return sysDicFormat('sys_user_manager_state', data)
            }
        },
        created() {
            this.queryData();
            this.querySysDic();
            this.queeryRoles()
        },
        methods: {
            queryData() {
                this.listLoading = true;
                userApi.userPage(this.requestData).then(response => {
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.pageNum = response.data.offset;
                    this.pageSize = response.data.size;
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },
            keyupEnter(){
                this.queryData();
            },
            handlePageChange(){
                this.queryData();
            },
            querySysDic(){
                sysDic.dicitemsbtypeCode({typeCode: this.userStateType}).then(response => {
                    this.userStates = response.data;
                }).catch(() => {

                })
            },
            queeryRoles(){
                this.roles = this.$store.getters.roles
            },
            validate(){
                this.$refs.user.validate((valid) => {
                    if (valid) {
                        this.validateValue = false
                    }
                })
            },
            add(){
                this.validate()
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                this.loading = true;
                userApi.add(this.user).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.queryData();
                    this.refreashForm();
                    this.dialogAddUserVisible = false;
                }).catch(() => {
                    this.loading = false;
                });
                this.validateValue = true
            },
            get(row){
                this.loading = true;
                userApi.getOne({id: row.id}).then(response => {
                    this.loading = false;
                    this.user = response.data;
                    this.dialogEditUserVisible = true;
                }).catch(() => {
                    this.loading = false;
                })
            },
            edit(){
                this.validate();
                if (this.validateValue) {
                    this.$message({
                        message: '请正确填写表单',
                        type: 'error',
                        duration: 3000
                    });
                    return;
                }
                this.loading = true;
                userApi.edit(this.user).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.queryData();
                    this.refreashForm();
                    this.dialogEditUserVisible = false;
                }).catch(() => {
                    this.loading = false;
                });
                this.validateValue = true
            },
            del(row){
                this.loading = true;
                userApi.del({id: row.id}).then(response => {
                    this.loading = false;
                    this.$message({
                        message: response.message,
                        type: 'success',
                        duration: 3000
                    });
                    this.queryData();
                }).catch(() => {
                    this.loading = false;
                })
            },
            refreashForm(){
                this.user = {
                    id: '',
                    username: '',
                    password: '',
                    nickname: '',
                    tel: '',
                    email: '',
                    photo: '',
                    state: '0',
                    roleId: ''
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>
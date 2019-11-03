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
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="listLoading"
                  element-loading-text="正在加载" border fit highlight-current-row>
            <el-table-column prop="id" label="用户ID"/>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="tel" label="电话" width="100">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.gender | handlerFomartDicItem(sysGenderType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="userMoney" label="余额" width="120">
            </el-table-column>
            <el-table-column prop="userPoint" label="积分" width="120">
            </el-table-column>
            <el-table-column prop="vipLevel" label="vip" width="120">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.state | handlerFomartDicItem(customerStateType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtCreate | handlerFomartTime()}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="resetPass(scope.row)">重置密码</el-button>
                    <el-button type="danger" size="mini" @click="getCustomer(scope.row)">状态变更</el-button>
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
        <el-dialog title="用户" width="500px" :visible.sync="dialogEditCustomerVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="customer" status-icon
                         label-width="100px"
                         size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="customer.id"></el-input>
                    </el-form-item>
                    <el-form-item label="loginId" hidden>
                        <el-input v-model="customer.loginId"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="customer.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="customer.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="customer.state" placeholder="请选择" style="width: 100%;">
                            <el-option v-for="item in customerStates"
                                       :key="item.code"
                                       :label="item.name"
                                       :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changeState()" :loading="loading">提交</el-button>
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
    import {parseTime} from "@/utils/formatUtils"
    import customerApi from "@/api/customer"
    import {sysDicFormat} from "@/utils/sysDicFormater"
    import sysDic from "@/api/sysdic"
    export default{
        components: {
            ElInput,
            ElCol,
            ElRow
        },
        data(){
            return {
                list: [],
                listLoading: false,
                pageNum: 1,
                pageSizes: [10, 20, 30, 40, 50],
                pageSize: 10,
                total: 4,
                requestData: {
                    pageNum: null,
                    pageSize: null,
                    username: null
                },
                loading: false,
                customerStateType: 'shop_customer_state',
                sysGenderType: 'sys_gender',
                customer: {
                    id: '',
                    loginId: '',
                    nickname: '',
                    username: '',
                    state: ''
                },
                dialogEditCustomerVisible: false,
                customerStates:null


            }
        },
        filters: {
            handlerFomartTime(data) {
                return parseTime(data)
            },
            handlerFomartDicItem(data, type){
                return sysDicFormat(type, data)
            }
        },
        created() {
            this.queryData();
            this.querySysDic();
        },
        methods: {
            queryData() {
                this.listLoading = true;
                customerApi.page(this.requestData).then(response => {
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
                sysDic.dicitemsbtypeCode({typeCode: this.customerStateType}).then(response => {
                    this.customerStates = response.data;
                }).catch(() => {

                })
            },
            resetPass(row){
                customerApi.resetPwd({id: row.id, loginId: row.loginId, state: this.state}).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                    }
                }).catch(() => {

                })
            },
            getCustomer(row){
                this.customer.id = row.id;
                this.customer.loginId = row.loginId;
                this.customer.username = row.username;
                this.customer.nickname = row.nickname;
                this.customer.state = row.state;
                this.dialogEditCustomerVisible = true;
            },
            changeState(){
                customerApi.chageState(this.customer).then(response => {
                    if (response.code === 10000) {
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.dialogEditCustomerVisible = false;
                    }
                }).catch(() => {

                })
            },
            refreashForm(){
                this.customer = {
                    id: '',
                    loginId: '',
                    nickname: '',
                    username: '',
                    state: ''
                }
            }
        }
    }
</script>
<style scoped>
    @import "../../styles/tablePage.scss";
</style>
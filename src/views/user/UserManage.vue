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
                    <el-button type="primary" size="medium " @click="fetchData">刷新数据</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-button type="primary" size="medium" @click="add">添加</el-button>
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
                    <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="edit(scope.row)">删除</el-button>
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
    </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    import userApi from "@/api/user"
    import { parseTime } from "@/utils/formatUtils"
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
                listLoading: false

            }
        },
        filters: {
            handlerFomartTime(data) {
                return parseTime(data)
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                userApi.userPage(this.requestData).then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    this.pageNum = response.data.offset
                    this.pageSize = response.data.size
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },
            keyupEnter(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            handlePageChange(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            add(){
                this.$message({
                    message: '待实现',
                    type: 'warning',
                    duration: 3000
                })
            },
            edit(row){
                this.$message({
                    message: "更新："+row.id+" 待实现",
                    type: 'warning',
                    duration: 3000
                })
            }
        }
    }
</script>

<style>
    @import "../../styles/tablePage.scss";
</style>
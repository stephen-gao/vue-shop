<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.code" placeholder="请输入用户名"
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
                    <el-button type="primary" size="medium" @click="add">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="listLoading"
                  element-loading-text="Loading" border fit highlight-current-row>
            <!--<el-table-column prop="id" label="ID"/>-->
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="code" label="编码">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
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
    import ElInput from "element-ui/packages/input/src/input";
    import sysdic from "@/api/sysdic"
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
                    code: null
                },
                listLoading: false

            }
        },
        filters: {

        },
        created() {
            this.queryData()
        },
        methods: {
            queryData() {
                this.listLoading = true;
                sysdic.page(this.requestData).then(response => {
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
                    message: "更新：" + row.id + " 待实现",
                    type: 'warning',
                    duration: 3000
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>
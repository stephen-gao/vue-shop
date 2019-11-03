<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.id" placeholder="请输入商品ID"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.title" placeholder="请输入商品名称"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.brand" placeholder="请输入品牌名称"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
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
                    <el-button type="primary" size="medium" @click="dialogAddBrandVisible=true">添加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table class="table-body" :data="list" row-key="id" stripe v-loading.body="listLoading"
                  element-loading-text="正在加载" border fit highlight-current-row>
            <el-table-column prop="id" label="商品ID">
            </el-table-column>
            <el-table-column prop="title" label="商品名称">
            </el-table-column>
            <el-table-column prop="brand" label="品牌">
            </el-table-column>
            <el-table-column prop="state" label="上下架">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.state === 1" type="success" size="mini">已上架</el-button>
                    <el-button v-if="scope.row.state === 0" type="info" size="mini">已下架</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="商品类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type | handlerFomartDicItem(spuSysType)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtCreate | handlerFomartTime()}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtUpdate" label="编辑时间">
                <template slot-scope="scope">
                    <span>{{scope.row.gmtCreate | handlerFomartTime()}}</span>
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
//    import Upload from "@/components/upload/upload.vue"
    import {parseTime} from "@/utils/formatUtils"
    import {sysDicFormat} from "@/utils/sysDicFormater"
    import spuApi from "@/api/spu"
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
                    title: null,
                    brand: '',
                    id:''
                },
                spuSysType: 'sys_spu_type',
                loading: false,
                imageUrls: {
                    sm: '',
                    md: '',
                    src: ''
                },
                validateValue: true
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
        },
        methods: {
            queryData() {
                this.listLoading = true;
                spuApi.page(this.requestData).then(response => {
                    this.list = response.data.records;
                    this.total = response.data.total;
                    this.pageNum = response.data.offset;
                    this.pageSize = response.data.size;
                    this.listLoading = false
                }).catch(() => {
                    this.listLoading = false
                })
            },
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>
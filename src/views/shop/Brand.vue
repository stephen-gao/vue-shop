<template>
    <div class="main-container">
        <el-row>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.brandName" placeholder="请输入品牌名称"
                              @keyup.enter.native="keyupEnter"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="table-head-box">
                    <el-input class="table-input" v-model="requestData.letter" placeholder="请输入品牌首字母"
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
            <el-table-column prop="image" label="图片" align="center">
                <template slot-scope="scope">
                    <el-image
                            style="width: 50px; height: 50px"
                            :src="scope.row.imageSm"
                            fit="contain"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="brandName" label="品牌名称">
            </el-table-column>
            <el-table-column prop="letter" label="首字母">
            </el-table-column>
            <el-table-column prop="detail" label="描述">
            </el-table-column>
            <el-table-column prop="sort" label="排序">
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
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="getBrand(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
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
        <el-dialog title="用户" width="500px" :visible.sync="dialogAddBrandVisible">
            <div style="text-align: left">
                <el-form style="width: 400px" :model="brand" :rules="rules" ref="brand" status-icon
                         label-width="100px"
                         size="small">
                    <el-form-item label="id" hidden>
                        <el-input v-model="brand.id"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌名称" prop="brandName">
                        <el-input v-model="brand.brandName"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="brand.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="首字母" prop="letter">
                        <el-input v-model="brand.letter"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="brand.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <!--<el-input v-model="brand.image"></el-input>-->
                        <Upload ref="upload" :images="imageUrls" @filePath="handleUploadResult"></Upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-if="!brand.id" @click="add()" :loading="loading">添加</el-button>
                        <el-button type="primary" v-if="brand.id" @click="edit()" :loading="loading">编辑</el-button>
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
    import Upload from "@/components/upload/upload.vue"
    import {parseTime} from "@/utils/formatUtils"
    import brandApi from '@/api/brand'
    export default{
        components: {
            ElInput,
            ElCol,
            ElRow,
            Upload
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
                    brandName: null,
                    letter:''
                },
                loading: false,
                brand: {
                    id: '',
                    brandName: '',
                    detail: '',
                    letter: '',
                    sort:'',
                    imageSm: '',
                    imageMd: '',
                    imageSrc: ''
                },
                imageUrls:{
                    sm:'',
                    md:'',
                    src:''
                },
                validateValue:true,
                dialogAddBrandVisible: false,
                rules:{
                    brandName: [
                        {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    ],
                    letter:[
                        {required: true, message: '请输入首字母', trigger: 'blur'},
                    ]
                }
            }
        },
        filters: {
            handlerFomartTime(data) {
                return parseTime(data)
            }
        },
        created() {
            this.queryData();
        },
        methods: {
            queryData() {
                this.listLoading = true;
                brandApi.page(this.requestData).then(response => {
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
            handleUploadResult(imageUrls){
                this.brand.imageSm = imageUrls.sm;
                this.brand.imageMd = imageUrls.md;
                this.brand.imageSrc = imageUrls.src;
                this.imageUrls = {
                    sm:this.brand.imageSm,
                    md:this.brand.imageMd,
                    src:this.brand.imageSrc
                };
            },
            refreashForm(){
                this.brand = {
                    id: '',
                    brandName: '',
                    detail: '',
                    letter: '',
                    sort:'',
                    imageSm: '',
                    imageMd: '',
                    imageSrc: ''
                };
                this.imageUrls={}
            },
            validate(){
                this.$refs.brand.validate((valid) => {
                    if (valid) {
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
                this.loading = true;
                brandApi.add(this.brand).then(response => {
                    this.loading = false;
                    if(response.code === 10000){
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.refreashForm();
                        this.dialogAddBrandVisible = false;
                    }
                }).catch(() => {
                    this.loading = false;
                });
            },
            getBrand(data){
                this.brand = data;
                this.imageUrls = {
                    sm:this.brand.imageSm,
                    md:this.brand.imageMd,
                    src:this.brand.imageSrc
                };
                this.dialogAddBrandVisible = true;
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
                this.loading = true;
                brandApi.edit(this.brand).then(response => {
                    this.loading = false;
                    if(response.code === 10000){
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                        this.refreashForm();
                        this.dialogAddBrandVisible = false;
                    }
                }).catch(() => {
                    this.loading = false;
                });
            },
            remove(data){
                brandApi.del({id:data.id}).then(response => {
                    if(response.code === 10000){
                        this.$message({
                            message: response.message,
                            type: 'success',
                            duration: 3000
                        });
                        this.queryData();
                    }
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>
    @import "../../styles/tablePage.scss";
</style>
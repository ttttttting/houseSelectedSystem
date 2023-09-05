import React,{useState,useRef,useEffect} from "react";
import { Button,Tag,Table,Popconfirm,Modal,Form,Input,DatePicker,message } from "antd";
import './task.css';
import '../api/index';
import { getTaskList } from "../api/index";

const Task =function Task(){
    // 定义需要的状态
    // 切换视图的状态
    let [selectedIndex,setselectedIndex] = useState(0),
    // 表格数组的初始值
    [tableData,setTabledata] = useState([]),
    [tableLoading,setTableloading] = useState(false),
    [ModalVisible,setModalVisible] = useState(false),
    [confirmLoading,setConfirmLoading] = useState(false);
    // let formIns = useRef(null);
    // 绑定时设置ref=formIns。使用时输出formIns.current
    let [formIns] = Form.useForm();
    
    // 对日期处理的方法
    const zero = function zero(text) {
        text = String(text);
        return text.length < 2 ? '0' + text : text;
    }
    const formatTime = function formatTime(time) {
        let arr = time.match(/\d+/g),
            [,month,day,hours = '00',minutes = '00'] = arr;
            // 不存在时设置默认值
        return `${zero(month)}-${zero(day)} ${zero(hours)}:${zero(minutes)}`;
    };
    const columns=[{
        title:'编号',
        dataIndex:'id',
        align:'center',
    },{
        title:'任务描述',
        dataIndex:'task',
        // 设置不自动换行，删除多余的信息
        ellipsis:true,
        // 按百分比设置宽度
        width:'30%',
    },{
        align:'center',
        title:'状态',
        // 指定字段名
        dataIndex:'state',
        render:(text,record) => {
            return +text === 1 ? '未完成':'已完成'
        }
    },{
        align:'center',
        title:'完成时间',
        dataIndex:'time',
        render:(_,record) => {
            let { state,time,complete} = record;
            if (+state === 2) time = complete;
            return formatTime(time);
        }
    },{
        title:'操作',
        render:(_,record) => {
            let {state} = record;
            return <>
                <Popconfirm title="你确定要删除此任务吗？">
                    <Button type="link">删除</Button>
                </Popconfirm>
                {+state != 2 ?<Popconfirm title="你确定设置此任务为完成吗？">
                    <Button type="link">完成</Button>
                </Popconfirm>:null}
            </>
        }
    }];

    const closeModal = () => {
        // 异步批处理只处理一次
        setModalVisible(false);
        setConfirmLoading(false);
    } ;
    const submit = async() => {
        try{
            await formIns.validateFields();
            let {task,time} = formIns.getFieldValue();
            // console.log(data);
            time = time.format('YYYY-MM-DD HH:mm:ss');
            console.log(time)
            message.success('表单校验通过');}
        catch(_){}
    };
    const queryData = async () => {
        try{let {code,list}=await getTaskList(selectedIndex);}
        catch(_){}
    }
    useEffect(() => {
        queryData();
    },[selectedIndex]);
    return <div className="task-box">
            {/* 头部 */}
            <div className="header">
                <h2 className="title">
                    TASK OA 任务管理系统
                </h2>
                <Button type="primary" onClick={()=>{
                    setModalVisible(true);
                }}>新增任务</Button>
            </div>
            {/* 标签 */}
            <div className="tag-box">
                {['全部','未完成','已完成'].map((item,index) => {
                    return <Tag key={index} color={selectedIndex===index?'#1677ff':''}
                            onClick={()=>{
                                // 加不加都不会进行渲染，该函数内部有优化机制：
                                //     修改状态值和之前的状态值是一致的，状态不更新，视图也不渲染
                                // if(selectedIndex===index) return;
                                setselectedIndex(index);
                            }}>
                        {item}
                    </Tag>
                })}
            </div>
            {/* 表格 */}
            {/* 注：rowkey必须指定且为唯一值 */}
            <Table dataSource={tableData} 
                    columns={columns} 
                    loading={tableLoading} 
                    pagination={false}
                    // 指定唯一key值，不指定会报错 
                    rowKey="id">
            </Table>
            {/* 对话框 & 表单 */}
            {/* confirmLoading:如果为true则设置防抖效果，防止服务器反应较慢的情况下向服务器发送多次请求 */}
            <Modal title="新增任务窗口" open={ModalVisible} confirmLoading={confirmLoading} keyboard={false} 
            mask={false} okText="确认提交" onCancel={closeModal} onOk={submit}>
                {/* confirmLoading:控制确定按钮的loading状态：提交的反抖处理 */}
                <Form form={formIns} layout="vertical" initialValues={{task:'',time:''}}>
                <Form.Item label="任务描述" name="task" validateTrigger="onBlur" 
                        rules={[{required:true,message:'任务描述是必填项'}
                        ,{min:6,message:"输入长度至少是六位及以上"}
                        ]}>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="预计完成时间" name="time" validateTrigger="onBlur" rules={[{required:true,message:'预计完成时间是必填项'}]}>
                        <DatePicker showTime></DatePicker>
                    </Form.Item>
                </Form>
            </Modal>
        </div>;
} 

export default Task;
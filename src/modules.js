// 订单管理
import allOrder from '@src/views/billManage/allOrder';
import allOrderDetails from '@src/views/billManage/allOrderDetails';
import clearedOrder from '@src/views/billManage/clearedOrder';
import clearedOrderDetails from '@src/views/billManage/clearedOrderDetails';
import billcustomerDetails from '@src/views/billManage/billcustomerDetails';
import handledOrder from '@src/views/billManage/handledOrder';
import handledOrderDetails from '@src/views/billManage/handledOrderDetails';
import OverdueOrder from '@src/views/billManage/OverdueOrder';
import OverdueOrderDetails from '@src/views/billManage/OverdueOrderDetails';
import pendingOrder from '@src/views/billManage/pendingOrder';
import pendingOrderDetails from '@src/views/billManage/pendingOrderDetails';
import repaymentOrder from '@src/views/billManage/repaymentOrder';
import repaymentOrderDetails from '@src/views/billManage/repaymentOrderDetails';
import clearedCustomerDetails from '@src/views/billManage/clearedCustomerDetails';
import OverdueCustomerDetails from '@src/views/billManage/OverdueCustomerDetails';
import repaymentCustomerDetails from '@src/views/billManage/repaymentCustomerDetails';
import repayAbnormalPendingBill from '@src/views/billManage/repayAbnormalPendingBill';
import repayAbnormalHandledBill from '@src/views/billManage/repayAbnormalHandledBill';
import repayAbnormalPendingDetails from '@src/views/billManage/repayAbnormalPendingDetails';
import repayAbnormalHandledDetails from '@src/views/billManage/repayAbnormalHandledDetails';




// 合同模板管理
import search from '@src/views/contractManage/search';
import edit from '@src/views/contractManage/edit';

// 客户管理
import blacklistManage from '@src/views/customerManage/blacklistManage'
import customerList from '@src/views/customerManage/customerList'
import whitelistManage from '@src/views/customerManage/whitelistManage'
import customerInfoDetails from '@src/views/customerManage/customerInfoDetails';
import domainSearch from '@src/views/customerManage/domainSearch';
import domainDetail from '@src/views/customerManage/domainDetail';
import domainAdd from '@src/views/customerManage/domainAdd';
//import customerPromotion from '@src/views/customerManage/customerPromotion';
//import feedBack from '@src/views/customerManage/feedBack';
// 我的主页
import index from '@src/views/homePage/index'

// 贷前管理
import abnormalLoan from '@src/views/loanManage/abnormalLoan'
import apply from '@src/views/loanManage/apply'
import auditDetails from '@src/views/loanManage/auditDetails'
import customerDetails from '@src/views/loanManage/customerDetails'
import details from '@src/views/loanManage/details'
import handledBill from '@src/views/loanManage/handledBill'
import loanApply from '@src/views/loanManage/loanApply'
import pendingBill from '@src/views/loanManage/pendingBill'
import query from '@src/views/loanManage/query'

// 系统管理
import userManage from '@src/views/systemManage/userManage';
import abnormalConfiguration from '@src/views/systemManage/abnormalConfiguration';
import creditManage from '@src/views/systemManage/creditManage';
import rejectThreshold from '@src/views/systemManage/rejectThreshold';
import calculateWordsShunt from '@src/views/systemManage/calculateWordsShunt';
//import peopleWhoseChannel from '@src/views/systemManage/peopleWhoseChannel';
import decisionEngine from '@src/views/systemManage/decisionEngine';
import feedBack from '@src/views/systemManage/feedBack';
import systemSettings from '@src/views/systemManage/systemSettings'
export {
    // 订单管理
    allOrder,
    allOrderDetails,
    clearedOrder,
    clearedOrderDetails,
    handledOrder,
    handledOrderDetails,
    OverdueOrder,
    OverdueOrderDetails,
    pendingOrder,
    pendingOrderDetails,
    repaymentOrder,
    repaymentOrderDetails,
    billcustomerDetails,
    repayAbnormalPendingBill,
    repayAbnormalHandledBill,
    repayAbnormalPendingDetails,
    repayAbnormalHandledDetails,
    clearedCustomerDetails,
    OverdueCustomerDetails,
    repaymentCustomerDetails,

    // 合同模板管理
    search,
    edit,
    
    // 客户管理
    blacklistManage,
    customerList,
    whitelistManage,
    customerInfoDetails,
    domainSearch,
    domainDetail,
    domainAdd,
    //customerPromotion,
    //feedBack,

    // 我的主页
    index,

    // 贷前管理
    abnormalLoan,
    apply,
    auditDetails,
    customerDetails,
    details,
    handledBill,
    loanApply,
    pendingBill,
    query,

    // 系统管理
    userManage,
    abnormalConfiguration,
    creditManage,
    rejectThreshold,
    calculateWordsShunt,
    //peopleWhoseChannel,
    decisionEngine,
    feedBack,
    systemSettings
}
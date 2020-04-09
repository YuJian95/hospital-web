<template lang="html">
  <div class="home-container">
    <el-row class="container">
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">{{collapsed?'':sysName}}</el-col>
        <el-col :span="10" class="path-name">
          <el-breadcrumb separator="/" class="path-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
            <el-dropdown-menu slot="dropdown">
<!--              <el-dropdown-item>我的消息</el-dropdown-item>-->
<!--              <el-dropdown-item>设置</el-dropdown-item>-->
              <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>

      <!--    左侧导航栏-->
      <el-col :span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            unique-opened
            background-color="#4E5CA4"
            text-color="#ffffff"
            active-text-color="#E6A23C"
          >
            <el-submenu :index="index + 1" v-for="(item,index) in $router.options.routes"
                        :key="index" v-if="!item.hidden">
              <template slot="title">
                <i :class="item.meta.icon" class="tab-icon"></i>
                <span class="tab-title">{{ item.meta.title }}</span>
              </template>

              <template v-for="(child,index2) in item.children"  v-if="!child.hidden" style="height: 50px;">
                <router-link :to="child.path" :key="child.name" style="text-decoration: none">
                  <el-menu-item :index="child.path" class="children-expanded">
                    <i :class="child.meta.icon" class="icon-color"></i>
                    <span>{{ child.meta.title }}</span>
                  </el-menu-item>
                </router-link>
              </template>

            </el-submenu>
          </el-menu>
        </aside>

        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {getPermission} from "@/permission";
  import {getToken} from "@/utils/auth";

  export default {
    name: "home",
    data() {
      return {
        sysName: '挂号系统',
        sysUserName: 'admin',
        collapsed: false
      }
    },
    methods:{
      // 退出登录
      logoutFun:function () {
        this.$confirm('确认退出吗？','提示',{

        }).then(() => {
          sessionStorage.removeItem('user')
          this.$router.push('/')
        })
      }
    },
    created() {
      if (getToken()) {
        getPermission()
      }
      console.log(this.$router)
      console.log('skdlfjdf')
    }
  }
</script>

<style lang="scss">
  $text-color: #ffffff;
  $major-color: #4E5CA4;
  //%tab-color:
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      /*background: #bbdbfb;*/
      background: #F2F2F2;
      color: $text-color;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          /*<!--color: $text-color;-->*/
          color: $major-color;
          font-size: 18px;
        }
      }
      .path-name{
        text-align: left;
        color: $major-color;
        margin-left: 30px;
        .path-inner{
          height: 60px;
          line-height: 60px;
          font-size: 16px;
        }
      }
      .logo {
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        background: #4270A8;
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px;
      }
      .tools {
        padding: 0 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        // 一级菜单的icon
        .tab-icon {
          width: 22px;
          font-size: 18px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          line-height: 56px;
          color: #ffffff;
        }
        // 一级菜单的标题
        .tab-title{
          color: #ffffff;
          font-size: 14px;
          position: absolute;
          top: 0;
          left: 60px;
        }
        .el-menu {
          height: 100%;
          background-color: #EDF1F6;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }
        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
        background-color: $major-color;
      }
      .children-expanded {
        height: 50px;
        line-height: 50px;
        margin-top: -4px;
        color: $text-color;
      }
      .content-container {
        flex: 1;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }

        }
        .content-wrapper {
          background-color: $text-color;
          box-sizing: border-box;
        }
      }
    }
  }
  // 改变颜色
  .children-expanded i{
    font-size: 16px;
    color: #ffffff;
  }
</style>

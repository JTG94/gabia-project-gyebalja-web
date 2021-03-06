<!--
 - Author : 이현재
 - Part : All
 - Image: https://www.freepik.com/free-vector/ranking-icons-set_3924710.htm#page=1&query=ranking&position=7
-->

<template>
  <div v-if="isGetData">
    <v-container
      fill-height
      fluid
      grid-list-xl
    >
      <v-layout wrap>
        <v-flex
          md12
          lg12
        >
          <!-- 카드 -->
          <material-card
            color="purple"
            title="올해의 교육 랭킹"
            text="Gabia education ranking"
          >
            <div
              v-if="this.$store.state.user.positionId <= isAccessibleMenu"
              class="text-xs-center">
              <div
                v-for="department in this.$store.state.departments"
                :key="department.id"
                style="display:inline-block"
                @click="renewDepartmentRanking(department.id, department.name)">
                <v-btn
                  color="#DDA0DD"
                  small
                  class="white--text"
                >{{ department.name }}</v-btn>&nbsp;
              </div>
            </div>
            <br>

            <!-- 랭킹 TOP 3 -->
            <v-layout wrap>
              <v-flex
                v-for="(user, i) in usersTop3"
                :key="i"
                sm12
                xs12
                md12
                lg4
              >
                <material-card
                  color="purple"
                  class="v-card-profile"
                  text-xs-center>
                  <v-badge
                    right
                    class="mt-2">
                    <v-avatar
                      slot="badge"
                      color="white"
                      size="40"
                      class="mb-1">
                      <v-img :src="require(`../images/ranking${i+1}.png`)"/>
                    </v-avatar>
                    <v-avatar
                      class="mx-auto d-block mb-4"
                      size="100"
                    >
                      <img
                        :src="user.profileImg"
                        class="mt-3"
                      >
                    </v-avatar>
                  </v-badge>

                  <v-card-text class="text-xs-center">
                    <h6 class="category text-gray font-weight-thin mb-3">{{ user.positionName }} / {{ user.department.name }}</h6>
                    <h3 class="card-title font-weight-light">
                      <v-icon color="black">mdi-account</v-icon>
                      {{ user.name }}&nbsp;
                      <span v-if="user.engName.length != 0">
                        ({{ user.engName }})
                      </span>
                    </h3>
                  </v-card-text>
                </material-card>
              </v-flex>
            </v-layout>

            <!-- 게시판 -->
            <!-- 랭킹 게시판 -->
            <v-flex
              xs12
              md12
              lg12
            >
              <material-card>
                <v-data-table
                  :headers="this.$store.state.state.rankingHeaders"
                  :items="users"
                  hide-actions
                >
                  <template
                    slot="headerCell"
                    slot-scope="{ header }"
                  >
                    <span
                      class="font-weight-light purple--text text--darken-3"
                      v-text="header.text"
                    />
                  </template>
                  <template
                    slot="items"
                    slot-scope="{ item }"
                  >
                    <td>{{ item.rank }}</td>
                    <td>{{ item.user.name }}</td>
                    <td class="my-td-left">
                      <span v-if="item.user.engName.length != 0">
                        {{ item.user.engName }}
                      </span>
                      <span v-else>
                        -
                      </span>
                    </td>
                    <td>{{ item.user.positionName }}</td>
                    <td class="my-td-center">{{ item.user.department.name }}</td>
                    <td class="my-td-center">{{ item.totalHour }}시간</td>
                    <td class="my-td-center">{{ item.totalCount }}건</td>
                  </template>
                  <template slot="no-data">
                    <p style="text-align:center; height:5%">
                      <span>
                        해당 부서에 등록된 사용자가 없습니다.
                      </span>
                    </p>
                  </template>
                </v-data-table>
              </material-card>
            </v-flex>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import bus from '../utils/bus.js'
import { getDepartmentRanking } from '../api/ranking/ranking.js'

export default {
  data () {
    return {
      // User
      users: [],
      usersTop3: [],
      usersTemp: [],

      // Flag
      isAccessibleMenu: '4',
      isGetData: false
    }
  },

  async created () {
    bus.$emit('start:spinner')
    try {
      await this.$store.dispatch('FETCH_DEPARTMENTS')
      await this.$store.dispatch('FETCH_USER')
      await this.initialize()
      this.isGetData = true
    } catch (error) {
      console.log(error)
      this.$router.push({ name: 'Error Page' })
    }
    bus.$emit('end:spinner')
  },

  methods: {
    async initialize () {
      const vm = this
      let defaultDepartmentId = '231'
      let departmentId = vm.$store.state.user.department.name === '가비아' ? defaultDepartmentId : vm.$store.state.user.department.id

      vm.usersTemp = await getDepartmentRanking(departmentId)
      vm.users = vm.usersTemp.data.response
      vm.renewRankingTop3(vm.users)
    },

    async renewDepartmentRanking (departmentId, departmentName) {
      if (departmentName === '가비아') return

      const vm = this
      vm.usersTemp = await getDepartmentRanking(departmentId)
      vm.users = vm.usersTemp.data.response
      vm.renewRankingTop3(vm.users)
    },

    renewRankingTop3 (users) {
      const thirdUserIndex = '2'
      this.usersTop3 = []
      for (let i in users) {
        this.usersTop3.push(users[i].user)
        if (i === thirdUserIndex) break
      }
    }
  }
}
</script>

<style scoped>
a {
  color: black;
}

.v-card-profile {
  display: block;
}

.my-td-left {
  text-align: left
}
.my-td-center {
  text-align: center
}
.my-td-right {
  text-align: right
}
.my-td-small {
  width: 5%;
}
.my-td-small-middle {
  width: 10%;
}
.my-td-middle {
  width: 15%;
}
.my-td-large {
  width: 30%;
}

.v-card-profile
  >>> .v-card__text {
  text-align: center;
}
.v-card-profile
  >>> .v-image {
    border-radius:10%
  }
</style>

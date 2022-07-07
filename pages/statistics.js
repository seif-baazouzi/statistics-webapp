import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ChartPieIcon from "@heroicons/react/outline/ChartPieIcon"

import Page from "@/components/Page"
import SelectCollection from "@/components/collections/select"
import SelectDate from "@/components/statistics/SelectDate"

import ChartBox from "@/components/statistics/ChartBox"
import BarChartBox from "@/components/statistics/BarChart"
import LineChartBox from "@/components/statistics/LineChart"
import PieCharBox from "@/components/statistics/PieChart"

import ajax from "@/utils/ajax"
import { apiServer } from "@/config/index"
import { parseCookies } from "@/utils/cookies"

import { getBarChartData } from "@/utils/format-statistics-data"
import { getPieChartData } from "../utils/format-statistics-data"

import styles from "@/styles/Statistics.module.css"

import { getCurrentDate } from "@/utils/date"

export default function StatisticsPage({ collectionsList }) {
  const router = useRouter()

  const [date, setDate] = useState(getCurrentDate())
  const [statistics, setStatistics] = useState({})
  const [statisticsType, setStatisticsType] = useState("weekly")
  const [selectedCollection, setSelectedCollection] = useState(collectionsList[0]?.collectionID)

  const [ labels, barChartData, isEmpty ] = getBarChartData(statistics)
  const pieChartData = getPieChartData([ labels, barChartData ])

  useEffect(() => {
    (async () => {
      if(!selectedCollection) return

      const res = await ajax.get(`/statistics/${statisticsType}/${selectedCollection}/${date}`)
      
      if(res.message === "invalid-token") {
        router.push("/login")
      } else {
        setStatistics(res.statistics)
      }
    })()
  }, [ selectedCollection, date, statisticsType ])

  return (
    <>
      <Page title="Statistics - Logs List">
        <div className={styles.topBar}>
          <SelectDate
            dateState={[date, setDate]}
            statisticsTypeState={[statisticsType, setStatisticsType]}
          />
          <SelectCollection
            collectionsList={collectionsList}
            setSelectedCollection={setSelectedCollection}
          />
        </div>

        {isEmpty ?
          <div className="message-container">
            <ChartPieIcon />
            <h3>There is not statistics!</h3>
          </div>
          :
          <div className={styles.chartsContainer}>
            <ChartBox
              childComponent={LineChartBox}
              props={{ data: barChartData, labels }}
            />
            <ChartBox
              childComponent={BarChartBox}
              props={{ data: barChartData, labels }}
            />
            <ChartBox
              childComponent={PieCharBox}
              props={{ data: pieChartData }}
            />
          </div>
        }
      </Page>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = parseCookies(context.req.headers.cookie)
  
  if(!cookies.token) {
    return {
      redirect: { permanent: false, destination: "/login" }
    }
  }

  const req = await fetch(`${apiServer}/collections`, {
    headers: {
      "X-Auth-Token": cookies.token
    }
  })
  const res = await req.json()

  if(res.message === "invalid-token") {
    return {
      redirect: { permanent: false, destination: "/login" }
    }
  }

  return {
    props: { collectionsList: res.collections }
  }
}

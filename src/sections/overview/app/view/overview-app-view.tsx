/* eslint-disable @next/next/no-img-element */
"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { SeoIllustration } from "@/assets/illustrations";

import { useSettingsContext } from "@/components/settings";

import AppWidget from "../app-widget";
import AppWelcome from "../app-welcome";
import { useAuthContext } from "@/auth/hooks";
import {
  useEventGrowth,
  useGetOverview,
  useGetRecentActivity,
  useGetTopUsers,
  useUserGrowth,
} from "@/api/dashboard";
import { useMemo } from "react";
import { paths } from "@/routes/paths";
import AppFeaturedBlog from "../app-featured-blog";
import { useGetPosts } from "@/api/blog";
import AnalyticsWidgetSummary from "../../analytics/analytics-widget-summary";
import AppUserEventGrow from "../app-user-event-growth";
import { getMonthLabel } from "@/types/dashboard";
import AppRecentTimeline from "../app-recent-timeline";
import AppTopUsers from "../app-top-users";

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const { recentItems } = useGetRecentActivity();
  const { posts } = useGetPosts();
  const { overview } = useGetOverview();
  const { userGrowth } = useUserGrowth();
  const { eventGrowth } = useEventGrowth();
  const { topProfile } = useGetTopUsers();
  const firstItem = useMemo(() => recentItems[0], [recentItems]);

  const settings = useSettingsContext();

  const userGrowthDataChart = useMemo(() => {
    if (!userGrowth) return { labels: [], series: [] };
    return {
      labels: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        getMonthLabel(i)
      ),
      series: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        userGrowth.labels.includes(i)
          ? userGrowth.values[userGrowth.labels.indexOf(i)]
          : 0
      ),
    };
  }, [userGrowth]);

  const eventGrowthDataChart = useMemo(() => {
    if (!eventGrowth) return { labels: [], series: [] };
    return {
      labels: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        getMonthLabel(i)
      ),
      series: Array.from({ length: 12 }, (_, i) => i + 1).map((i) =>
        eventGrowth.labels.includes(i)
          ? eventGrowth.values[eventGrowth.labels.indexOf(i)]
          : 0
      ),
    };
  }, [eventGrowth]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Grid container spacing={3}>
        <Grid xs={12} md={posts.length === 0 ? 12 : 8}>
          {firstItem && (
            <AppWelcome
              title={`Welcome back 👋 \n ${user?.username}`}
              description={`Here’s what’s happening with your projects today. A new ${firstItem.type} has been added!`}
              img={<SeoIllustration />}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  href={paths.dashboard.item(firstItem.type)}
                >
                  Go Now
                </Button>
              }
            />
          )}
        </Grid>

        {posts.length > 0 && (
          <Grid xs={12} md={4}>
            <AppFeaturedBlog
              list={posts.splice(posts.length < 4 ? 0 : posts.length - 4)}
            />
          </Grid>
        )}
        {overview && (
          <>
            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Upcoming Event"
                total={overview.upcoming_events}
                icon={
                  <img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Users"
                total={overview.total_users}
                color="info"
                icon={
                  <img
                    alt="icon"
                    src="/assets/icons/glass/ic_glass_users.png"
                  />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Poses"
                total={overview.total_poses}
                color="warning"
                icon={
                  <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <AnalyticsWidgetSummary
                title="Total Exercises"
                total={overview.total_exercises}
                color="error"
                icon={
                  <img
                    alt="icon"
                    src="/assets/icons/glass/ic_glass_message.png"
                  />
                }
              />
            </Grid>
          </>
        )}

        {userGrowthDataChart.labels.length > 0 && (
          <Grid xs={12} md={6} lg={8}>
            <AppUserEventGrow
              title="Percent Growth in Year"
              subheader="Details of User and Event Growth in Year"
              chart={{
                labels: userGrowthDataChart.labels,
                series: [
                  {
                    name: "New Users",
                    type: "column",
                    fill: "solid",
                    data: userGrowthDataChart.series,
                  },
                  // {
                  //   name: "Team B",
                  //   type: "area",
                  //   fill: "gradient",
                  //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  // },
                  {
                    name: "Event Growth",
                    type: "line",
                    fill: "solid",
                    data: eventGrowthDataChart.series,
                  },
                ],
              }}
            />
          </Grid>
        )}

        <Grid xs={12} md={4}>
          {recentItems && (
            <AppRecentTimeline list={recentItems} title="Recent Activity" />
          )}
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          {topProfile && (
            <AppTopUsers title="Top Users" list={topProfile.slice(0, 3)} />
          )}
        </Grid>

        {overview && (
          <Grid xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Conversion - Active Users"
                total={overview?.active_users || 0}
                icon="solar:user-rounded-bold"
                chart={{
                  series:
                    (overview?.active_users / overview.total_users) * 100 || 0,
                }}
              />

              <AppWidget
                title="Log in Platform"
                total={7727}
                icon="fluent:mail-24-filled"
                color="info"
                chart={{
                  series: 82,
                }}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

import { GetServerSidePropsContext } from "next";

export function cacheRequest(context: GetServerSidePropsContext, seconds = 60) {
	const { res } = context;
	res.setHeader("Cache-Control", `s-maxage=${seconds}, stale-while-revalidate`);
}

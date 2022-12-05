import React from "react";
import { CharacterEntity } from "crossbell.js";

import { useCharacters } from "@crossbell/indexer";

import { useAccountState } from "./account-state";

export type UseAccountCharactersResult = {
	isLoading: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	characters: CharacterEntity[];
	fetchNextPage: () => void;
};

export function useAccountCharacters(): UseAccountCharactersResult {
	const account = useAccountState((s) => s.computed.account);
	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useCharacters(account?.address);
	const characters = React.useMemo(
		() => data?.pages.flatMap((page) => page.list) ?? [],
		[data]
	);

	if (account?.type === "email") {
		return {
			isLoading: false,
			hasNextPage: false,
			isFetchingNextPage: false,
			characters: [account.character],
			fetchNextPage() {},
		};
	} else {
		return {
			isLoading,
			hasNextPage: !!hasNextPage,
			isFetchingNextPage,
			characters,
			fetchNextPage,
		};
	}
}

import apiFetch from "@wordpress/api-fetch";
import { createReduxStore, register, dispatch } from "@wordpress/data";

// actions
const actions = {
	receiveRecord(record) {
		return {
			type: "RECEIVE_RECORD",
			record,
		};
	},
};

// set initial state
const DEFAULT_STATE = {
	records: [],
};

const store = createReduxStore("get-record-by", {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case "RECEIVE_RECORD":
				if (
					-1 === state.records.findIndex((item) => item.id === action.record.id)
				) {
					return {
						...state,
						records: [...state.records, action.record],
					};
				} else {
					return state;
				}
		}

		return state;
	},

	actions,

	selectors: {
		id(state, id) {
			const { records } = state;
			console.log("selector", id);
			return state.records.find((record) => record.id === id);
		},
	},

	resolvers: {
		id:
			(id) =>
			async ({ dispatch }) => {
				const record = await apiFetch({
					path: `/wiley/v1/find-post-by/id/${id}/`,
				});
				console.log("resolver", record);
				if (record?.id) {
					dispatch.receiveRecord(record);
				}
			},
	},
});

register(store);

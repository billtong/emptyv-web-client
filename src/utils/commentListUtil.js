export const getCommentUserIds = (commentList) => {
	const ids = commentList.map(item => item.userId);
	const finalIds = [...new Set(ids)];
	return finalIds.join(",");
};

export const handleCommentList = (commentList, userList) => {
	commentList.forEach(item => {
		item.userInfo = userList.find(user => user.id === item.userId);
	});
	const repliesList = commentList.filter(item => item.parentId !== null);
	const resultList = commentList.map(item => {
		if (!item.parentId) {
			const replies = repliesList.filter(reply => reply.parentId === item.id);
			item.replies = replies;
			return item;
		}
	});
	return resultList.filter(item => item);
};

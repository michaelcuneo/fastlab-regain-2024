<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import {} from '$lib/utils/store';

	import {
		user,
		allUsers,
		helpMessages,
		usersettings,
		addMessage,
		editMessage,
		removeMessage,
		isEmpty
	} from '$lib/utils/store';

	let usersArray = allUsers.value;
	let author: string;

	let createMessageSubscription;
	let editMessageSubscription;
	let removeMessageSubscription;

	onMount(() => {
		createMessageSubscription = (
			API.graphql(graphqlOperation(onCreateMessages)) as GraphQLSubscription<any>
		).subscribe({
			next: ({ value }) => updateReceived(value),
			error: (error: any) => console.log(error)
		});
		editMessageSubscription = (
			API.graphql(graphqlOperation(onUpdateMessages)) as GraphQLSubscription<any>
		).subscribe({
			next: ({ value }) => updateReceived(value),
			error: (error: any) => console.log(error)
		});
		removeMessageSubscription = (
			API.graphql(graphqlOperation(onDeleteMessages)) as GraphQLSubscription<any>
		).subscribe({
			next: ({ value }) => getNewMessages(),
			error: (error: any) => console.log(error)
		});
	});

	onDestroy(() => {
		createMessageSubscription.unsubscribe();
		editMessageSubscription.unsubscribe();
		removeMessageSubscription.unsubscribe();
	});

	const getNewMessages = async () => {
		await (
			API.graphql(
				graphqlOperation(messagesByDate, {
					type: 'Message',
					sortDirection: 'DESC',
					limit: '1000'
				})
			) as GraphQLSubscription<any>
		)
			.then((res) => {
				newMessage = '';
				helpMessages.set(res.data.messagesByDate.items);
			})
			.catch((err) => err);
	};

	/*
  if (usersArray.length > 0 && !isEmpty($user) && $user !== null) {
    for (let i = 0; i < usersArray.length; i++) {
      if (usersArray[i].id === $user.attributes.sub) {
        author = usersArray[i].id;
      }
    }
  }
  */

	// Update the message.
	const updateReceived = async ({ data }) => {
		editMessage({
			id: data.onCreateMessages.id,
			createdAt: data.onCreateMessages.createdAt,
			content: data.onCreateMessages.content,
			type: data.onCreateMessages.type,
			isSent: true,
			messagesUserId: data.onCreateMessages.messagesStaffId
		}).then((res) => getNewMessages());
	};

	const updateMessage = async (message) => {
		editMessage({
			id: message.id,
			createdAt: message.createdAt,
			content: message.content,
			type: message.type,
			isSent: true,
			messagesUserId: message.messagesStaffId
		});
		updatingId = null;
	};

	const handleSubmit = async (e: any) => {
		e.key === 'Enter' && newMessage !== null && submitMessage();
	};

	const handleEdit = async (e: any, message: helpMessageType) => {
		e.key === 'Enter' && newMessage !== null && updateMessage(message);
	};

	// Add the message.
	const submitMessage = async () => {
		addMessage({
			id: uuidv4(),
			content: newMessage,
			createdAt: new Date().toISOString(),
			type: 'Message',
			isSent: false,
			messagesUserId: author
		});
	};

	const deleteMessage = async (id) => {
		removeMessage({
			id: id
		});
	};

	const handleReset = () => {
		resetState();
		goto('/');
	};

	const handleUpdating = (id) => {
		if (updatingId === null) {
			updatingId = id;
		} else {
			updatingId = null;
		}
	};

	onMount(() => {
		if (!isEmpty($usersettings)) {
			author = $usersettings.id;
		}
		getNewMessages();
	});

	let updatingId = null;
	let newMessage = null;
</script>

<LayoutGrid>
	<Cell span={4}>
		<Card>
			<Paper>
				<Title
					>The following button will reset the cache and clean all app functions to their default,
					this button will also log you out.</Title
				>
				<Subtitle>EMERGENCY ONLY</Subtitle>
				<Button variant="raised" on:click={handleReset}>RESET APP</Button>
			</Paper>
		</Card>
	</Cell>
	<Cell span={8}>
		<Card>
			<Content>
				<message-scroller>
					{#each $helpMessages as message}
						<message>
							<header>
								<staff>
									{#if message.user}
										{message.user.username}
									{:else}
										GUEST
									{/if}
								</staff>
								<time>
									{new Date(message.createdAt).toUTCString()}
								</time>
							</header>
							<message-content>
								<message-text>
									{#if updatingId == message.id}
										<Textfield
											style="width: 100%;"
											variant="outlined"
											bind:value={message.content}
											on:keydown={(e) => handleEdit(e, message)}
										/>
									{:else}
										{message.content}
									{/if}
								</message-text>
								<message-buttons>
									<IconButton
										style="color: green;"
										class="material-icons"
										on:click={() => handleUpdating(message.id)}>edit</IconButton
									>
									<IconButton
										style="color: red;"
										class="material-icons"
										on:click={() => deleteMessage(message.id)}>delete</IconButton
									>
								</message-buttons>
							</message-content>
						</message>
					{/each}
				</message-scroller>
				<message-entry>
					<Textfield
						style="padding-right: 0.2em; width: 100%;"
						variant="outlined"
						bind:value={newMessage}
						on:keydown={(e) => handleSubmit(e)}
					/>
					<Button variant="raised" on:click={() => newMessage !== null && submitMessage()}
						>send</Button
					>
				</message-entry>
			</Content>
		</Card>
	</Cell>
</LayoutGrid>

<style>
	message-scroller {
		display: flex;
		flex-direction: column-reverse;
		overflow: auto;
		max-height: calc(100vh - 206px);
	}
	message {
		display: flex;
		flex-direction: column;
		padding: 1em;
		margin-top: 1em;
		border: 1px solid black;
		border-radius: 3px;
	}
	message-entry {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 1em;
	}
	message-text {
		display: flex;
		align-items: flex-end;
		width: 100%;
	}
	message-buttons {
		display: flex;
		align-items: flex-end;
		flex-direction: row;
	}
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 0.2em;
	}
	staff {
		line-height: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-size: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-family: monospace;
		font-weight: 200;
	}
	message-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 0.2em;
	}
	time {
		line-height: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-size: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-family: monospace;
		font-weight: 200;
	}
</style>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content } from '@smui/card';
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import IconButton from '@smui/icon-button';

	import { user, allUsers, helpMessages, usersettings } from '$lib/utils/store';

	let usersArray = $allUsers;
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

<div class="wrapper">
<LayoutGrid>
	<Cell span={12}>
		<Card>
			<Content>
				<div class="message-scroller">
					{#each $helpMessages as message}
						<div class="message">
							<header>
								<div class="staff">
									{#if message.user}
										{message.user.username}
									{:else}
										GUEST
									{/if}
								</div>
								<div class="time">
									{new Date(message.createdAt).toUTCString()}
								</div>
							</header>
							<div class="message-content">
								<div class="message-text">
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
								</div>
								<div class="message-buttons">
									<IconButton
										style="color: green;"
										class="material-icons"
										onclick={() => handleUpdating(message.id)}>edit</IconButton
									>
									<IconButton
										style="color: red;"
										class="material-icons"
										onclick={() => deleteMessage(message.id)}>delete</IconButton
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
				<div class="message-entry">
					<Textfield
						style="padding-right: 0.2em; width: 100%;"
						variant="outlined"
						bind:value={newMessage}
						onkeydown={(e) => handleSubmit(e)}
					/>
					<Button variant="raised" onclick={() => newMessage !== null && submitMessage()}
						>send</Button
					>
				</div>
			</Content>
		</Card>
	</Cell>
</LayoutGrid>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.1);
		flex: 1;
	}
	.message-scroller {
		display: flex;
		flex-direction: column-reverse;
		overflow: auto;
		max-height: calc(100vh - 206px);
	}
	.message {
		display: flex;
		flex-direction: column;
		padding: 1em;
		margin-top: 1em;
		border: 1px solid black;
		border-radius: 3px;
	}
	.message-entry {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 1em;
	}
	.message-text {
		display: flex;
		align-items: flex-end;
		width: 100%;
	}
	.message-buttons {
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
	.staff {
		line-height: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-size: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-family: monospace;
		font-weight: 200;
	}
	.message-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 0.2em;
	}
	.time {
		line-height: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-size: calc(11px + (14 - 11) * (100vw - 320px) / (1920 - 320));
		font-family: monospace;
		font-weight: 200;
	}
</style>

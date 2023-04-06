import React from 'react'

const WalletModal = () => {
  return (
    <CustomModal
      isOpen={newWalletModal.open}
      handleClose={closeModal}
      heading="Create New Wallet"
      hasCancel
    >
      <NewWalletDialog />
    </CustomModal>
  )
}

const NewWalletDialog = () => (
  <Box textAlign="center" pb="20px">
    <Flex direction="column" gap="2rem">
      {newWalletModal.loading ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="orange.200"
            color="grey.100"
            size="xl"
            mx="auto"
          />
          <div>
            <Text>Creating your wallet</Text>
          </div>
        </>
      ) : newWalletModal.error.state ? (
        <>
          <Icon as={MdCancel} fontSize="80px" color="red.500" />
          <Text color="red.400">{newWalletModal.error.message}</Text>
        </>
      ) : (
        <>
          <Image src={CheckCircle} mx="auto" />
          <Text fontSize="12px">
            <Highlight
              query="copy"
              styles={{ fontWeight: "700", fontSize: "14px" }}
            >
              Wallet Created. Please copy the mnemonic below, it is important
              for account recovery. This mnemonic is lost after closing modal.
            </Highlight>
          </Text>
          <InputGroup>
            <InputLeftAddon children="mnemonic" />
            <Input
              type="tel"
              placeholder="phone number"
              value={newWalletModal.data?.mnemonic}
              onChange={() => {}}
            />
            <InputRightElement
              children={
                <Tooltip
                  label={
                    newWalletModal.seed.copied ? "copied" : "click to copy"
                  }
                >
                  <IconButton
                    aria-label="click to copy mnemonic"
                    icon={<FaCopy />}
                    onClick={copyMnemonic}
                    bgColor="grey.400"
                    color="white"
                  />
                </Tooltip>
              }
            />
          </InputGroup>
          {/* <Box textAlign="left" p="5px" background="grey.100" border="2px solid" borderColor="grey.150" borderRadius="lg" overflowY="scroll">
                      {newWalletModal.data?.mnemonic}
                  </Box> */}
          <Box textAlign="left">
            <label htmlFor="address">Wallet Address:</label>
            <Text
              p="5px"
              background="grey.100"
              border="2px solid"
              borderColor="grey.150"
              borderRadius="lg"
            >
              {newWalletModal.data?.address}
            </Text>
          </Box>
        </>
      )}
    </Flex>
  </Box>
);

export default WalletModal
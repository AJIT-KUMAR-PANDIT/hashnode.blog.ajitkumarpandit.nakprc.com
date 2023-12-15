# hashnode-starter-kit

This helm chart is just using a subchart of our standardized deployment helm charts

## Introduction

This chart bootstraps a highly available deployment on a [Kubernetes](http://kubernetes.io) cluster using the [Helm](https://helm.sh) package manager.

## Prerequisites

- Kubernetes 1.10+ with Beta APIs enabled
- The kubectl binary
- The helm binary
- Helm diff plugin installed

## Installing the Chart

To install the chart...

```bash
# dev
export SERVICE_NAME="hashnode-starter-kit"
export CI_ENVIRONMENT_SLUG="dev"
export K8S_NAMESPACE=$CI_ENVIRONMENT_SLUG
export HELM_CHART=$SERVICE_NAME
export CURRENT_HELM_CHART=$SERVICE_NAME
export HELM_IMG_TAG="dev-175cca8e33289149fa53748eae7276cbbf307fb1"

export SERVICE_NAME="hashnode-starter-kit"
export CI_ENVIRONMENT_SLUG="prod"
export K8S_NAMESPACE=$CI_ENVIRONMENT_SLUG
export HELM_CHART=$SERVICE_NAME
export CURRENT_HELM_CHART=$SERVICE_NAME
export HELM_IMG_TAG="dev-175cca8e33289149fa53748eae7276cbbf307fb1"


# Go into our deployment folder
cd deployment
# Update our helm subchart...
helm dependencies update $SERVICE_NAME/
# View the diff of what you want to do
helm diff upgrade --namespace $K8S_NAMESPACE --allow-unreleased $CURRENT_HELM_CHART $HELM_CHART     -f $CURRENT_HELM_CHART/values.yaml     -f $CURRENT_HELM_CHART/values-${CI_ENVIRONMENT_SLUG}.yaml     --set global.image.tag="$HELM_IMG_TAG"
# Actually do it...
helm upgrade --namespace $K8S_NAMESPACE --install $CURRENT_HELM_CHART $HELM_CHART     -f $CURRENT_HELM_CHART/values.yaml     -f $CURRENT_HELM_CHART/values-${CI_ENVIRONMENT_SLUG}.yaml  --set global.image.tag="$HELM_IMG_TAG"
```

## Configuration

For configuration options possible, please see our [helm-charts](#todo) repository


## Misc notes

```
DNS Records for migrating to Kubernetes...
K8S = TODO
TODO
```
